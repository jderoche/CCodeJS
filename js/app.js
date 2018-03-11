let vm = new Vue({
  el: '#app',
  data: {
    message: 'C Code IDE',
    codetext: 'Task 1',
    consoleoutput : ''
  },
  methods:
  {
    Close : function(){
      this.showcode = 0;
      this.failed = 0;
      },
    
    Run : function(){
        this.consoleoutput = "No compiler error...";
    },
    
    parse : function() {
        this.consoleoutput = this.codetext;
    }
  }
})
