# Sehaat-Saathi

A healthcare companion application.

## Project Structure

```
Sehaat-Saathi/
├── frontend/          # Frontend application code
│   ├── src/          # Source files
│   └── public/       # Public assets
├── backend/          # Backend application code
│   ├── src/          # Source files
│   └── config/       # Configuration files
├── docs/             # Documentation
└── README.md         # This file
```

## Getting Started

### How to Upload Your Codebase

If you're trying to upload your project files to this repository, follow these steps:

#### Option 1: Using Git Command Line

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/abhishekkumar62000/Sehaat-Saathi.git
   cd Sehaat-Saathi
   ```

2. **Add your project files**:
   - Copy your frontend files to the `frontend/` directory
   - Copy your backend files to the `backend/` directory
   - Add any documentation to the `docs/` directory

3. **Stage and commit your changes**:
   ```bash
   git add .
   git commit -m "Add project codebase"
   ```

4. **Push to GitHub**:
   ```bash
   git push origin main
   ```

#### Option 2: Using GitHub Web Interface

1. Navigate to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag and drop your project folders or click "choose your files"
4. Commit the changes

#### Option 3: Using GitHub Desktop

1. Open GitHub Desktop
2. Clone your repository
3. Copy your project files into the repository folder
4. Commit and push the changes

### Common Issues and Solutions

**Issue**: Large files won't upload  
**Solution**: Files larger than 100MB require Git LFS. Install Git LFS and track large files:
```bash
git lfs install
git lfs track "*.psd"
git add .gitattributes
```

**Issue**: Too many files to upload at once  
**Solution**: Commit files in smaller batches or use command line instead of web interface.

**Issue**: Empty directories not showing  
**Solution**: Git doesn't track empty directories. Add a `.gitkeep` file to maintain the directory structure.

### Project Setup

Once your codebase is uploaded, update this README with:
- Installation instructions
- Dependencies
- How to run the project
- API documentation
- Contributing guidelines

## License

See [LICENSE](LICENSE) for details.
