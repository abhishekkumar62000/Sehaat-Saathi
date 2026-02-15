import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesPath = path.join(__dirname, '..', 'data', 'diseaseRules.json');
const medicineKBPath = path.join(__dirname, '..', 'data', 'medicineKB.json');


/**
 * Rule Engine for Sehaat AI Doctor (Layer-1)
 * Handles symptom mapping and decision tree evaluation
 */
class RuleEngine {
    constructor() {
        this.rules = {};
        this.medicines = [];
        this.synonyms = {

            // FEVER
            "bukhaar": "fever", "tap": "fever", "bukhar": "fever", "temperature": "fever",
            "shirahan": "chills", "thand": "chills", "kanpkapi": "chills",
            // HEADACHE
            "sir dard": "headache", "sar dard": "headache", "adhasis": "migraine", "matha": "headache",
            // ACIDITY & STOMACH
            "pet me jalan": "acidity", "gastric": "acidity", "khatti dakar": "acidity",
            "pet kharab": "indigestion", "aphara": "bloating", "gas": "bloating",
            "dust": "diarrhea", "loose motion": "diarrhea", "peshab": "urinary",
            // PAIN
            "dard": "pain", "kamar": "back pain", "pith": "back", "joro": "joint", "ghutna": "knee",
            // SKIN
            "khujli": "itching", "daane": "rash", "chakte": "rash", "phunsi": "acne",
            // BREATHING
            "saans": "breathing", "dum": "breath", "fayfary": "lungs", "sine": "chest",
            // GENERAL
            "thakan": "fatigue", "kamzori": "weakness", "sust": "lethargy", "chakkar": "dizziness"
        };
        this.loadRules();
        this.loadMedicines();
    }

    loadRules() {

        try {
            if (fs.existsSync(rulesPath)) {
                const data = fs.readFileSync(rulesPath, 'utf8');
                this.rules = JSON.parse(data);
                console.log(`[RuleEngine] Loaded ${Object.keys(this.rules).length} diseases/conditions.`);
            } else {
                console.warn('[RuleEngine] diseaseRules.json not found. Using empty ruleset.');
            }
        } catch (error) {
            console.error('[RuleEngine] Error loading rules:', error);
        }
    }

    loadMedicines() {
        try {
            if (fs.existsSync(medicineKBPath)) {
                const data = fs.readFileSync(medicineKBPath, 'utf8');
                this.medicines = JSON.parse(data);
                console.log(`[RuleEngine] Loaded ${this.medicines.length} medicines into knowledge base.`);
            } else {
                console.warn('[RuleEngine] medicineKB.json not found.');
            }
        } catch (error) {
            console.error('[RuleEngine] Error loading medicines:', error);
        }
    }


    /**
     * Map user input message to a specific disease condition
     * Uses fuzzy matching, synonyms, and emergency prioritization
     */
    findMatch(message) {
        let input = (message || "").toLowerCase();
        const tokens = input.split(/\s+/);

        // Priority 1: Global Emergency Keywords (Direct + Fuzzy)
        const emergencyKeywords = ['chest pain', 'heart attack', 'breathing', 'unconscious', 'behoshi', 'dil me dard', 'saans', 'heart', 'oxygen', 'khoon', 'blood', 'chot', 'injury'];
        if (emergencyKeywords.some(kw => input.includes(kw) || this._isFuzzyMatch(tokens, kw))) {
            return { type: 'EMERGENCY_GLOBAL' };
        }

        // Apply Synonym mapping (normalize input)
        for (const [syn, standard] of Object.entries(this.synonyms)) {
            if (input.includes(syn) || this._isFuzzyMatch(tokens, syn)) {
                input += ` ${standard}`;
            }
        }

        // Priority 2: Disease Keywords (Fuzzy Toggled)
        for (const [id, rule] of Object.entries(this.rules)) {
            const hasMatch = rule.keywords.some(kw => {
                const kwLow = kw.toLowerCase();
                return input.includes(kwLow) || this._isFuzzyMatch(tokens, kwLow);
            });

            if (hasMatch) {
                return { type: 'DISEASE_MATCH', diseaseId: id, rule };
            }
        }

        return null;
    }

    // Fuzzy matching helper: checks if any token in the input is "close enough" to target
    _isFuzzyMatch(tokens, target) {
        if (target.length < 4) return false; // Don't fuzzy match short words to avoid noise
        const threshold = target.length > 7 ? 2 : 1; // Tolerance level

        return tokens.some(token => {
            if (Math.abs(token.length - target.length) > threshold) return false;
            return this._levenshteinDistance(token, target) <= threshold;
        });
    }

    _levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    /**
     * Evaluate the final result based on answers provided
     */
    evaluateResult(diseaseId, answers) {
        const rule = this.rules[diseaseId];
        if (!rule) return null;

        // Iterate through results to find the first matching condition
        for (const res of rule.results) {
            if (res.condition === 'default') continue;

            try {
                // Simple evaluation context
                const context = answers;
                // Using Function constructor is safer than eval for simple comparison logic
                const isMatch = Array.isArray(res.condition)
                    ? res.condition.every(c => this._evaluateSingleCondition(c, context))
                    : this._evaluateSingleCondition(res.condition, context);

                if (isMatch) return res;
            } catch (e) {
                console.error(`[RuleEngine] evaluation error for ${diseaseId}:`, e);
            }
        }

        // Fallback to default result
        return rule.results.find(r => r.condition === 'default') || rule.results[0];
    }

    /**
     * Helper to evaluate simple string conditions like "temperature > 103"
     */
    _evaluateSingleCondition(condString, context) {
        // Handle direct value comparison: "key === 'value'" or "key > number"
        const parts = condString.split(' ');
        if (parts.length < 3) return false;

        const [key, op, ...valParts] = parts;
        const rawVal = valParts.join(' ');
        const val = rawVal.replace(/'/g, "").replace(/"/g, "");
        const userVal = context[key];

        if (userVal === undefined) return false;

        switch (op) {
            case '===': return String(userVal) === String(val);
            case '!==': return String(userVal) !== String(val);
            case '>': return parseFloat(userVal) > parseFloat(val);
            case '<': return parseFloat(userVal) < parseFloat(val);
            case '>=': return parseFloat(userVal) >= parseFloat(val);
            case '<=': return parseFloat(userVal) <= parseFloat(val);
            case 'includes': return String(userVal).toLowerCase().includes(val.toLowerCase());
            default: return false;
        }
    }
    /**
     * Extracts relevant medicine context based on keywords in the query.
     */
    getMedicineContext(query) {
        if (!this.medicines || !this.medicines.length) return "";

        const input = (query || "").toLowerCase();
        const tokens = input.split(/\s+/);

        // Find medicines that match keywords in name, category, or symptoms
        const matches = this.medicines.filter(med => {
            const nameMatch = med.name.toLowerCase().includes(input) || tokens.some(t => med.name.toLowerCase().includes(t));
            const categoryMatch = med.category.toLowerCase().includes(input);
            const symptomMatch = med.symptoms && med.symptoms.some(s => input.includes(s.toLowerCase()) || tokens.some(t => s.toLowerCase().includes(t)));

            return nameMatch || categoryMatch || symptomMatch;
        });

        if (matches.length === 0) return "";

        // Format the top matches for LLM context (max 3 to avoid token bloat)
        const context = matches.slice(0, 3).map(med => {
            return `Medicine: ${med.name}
Category: ${med.category}
Symptoms: ${med.symptoms ? med.symptoms.join(', ') : 'N/A'}
Dosage: ${med.dosage}
Frequency: ${med.frequency}
Max Dose: ${med.maxDose}
Benefits: ${Array.isArray(med.benefits) ? med.benefits.join(', ') : med.benefits}
Safety: ${med.safety || 'Follow medical advice'}
Source: ${med.sources ? (Array.isArray(med.sources) ? med.sources.join(', ') : med.sources) : 'Medical Database'}`;
        }).join('\n\n---\n\n');

        return `\nRELEVANT MEDICINE KNOWLEDGE FROM SEHAAT SAATHI DATABASE:\n${context}\n`;
    }
}

export default new RuleEngine();

