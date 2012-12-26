function Logger(event, info) {
    this.logList = [];
}
Logger.prototype.addLog = function(log,callback){
    this.logList.push(log);
    callback(this.logList);
};
Logger.prototype.reportLog = function(){
    //TODO:AJAX
}
