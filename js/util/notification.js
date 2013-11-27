// Error Notification
var util_errorNotification = function(message, error, callback) {
    console.log(message, error);
    Lungo.Notification.error(message, "", "warning-sign", 0, callback);
};

// Success Notification
var util_successNotification = function(message, callback) {
    console.log(message);
    Lungo.Notification.success(message, "", "thumbs-up", 0, callback);
};
