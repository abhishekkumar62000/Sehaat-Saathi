import Notification from "../models/NotificationSchema.js";

export const getNotifications = async (req, res) => {
  const userId = req.userId;

  try {
    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch neural alerts" });
  }
};

export const markAsRead = async (req, res) => {
  const notificationId = req.params.id;

  try {
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    res.status(200).json({ success: true, message: "Alert synced to read state" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Sync failure" });
  }
};
