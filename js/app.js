_TOKEN_LIST_ = {
  "//":"comment line",
  "/*":"comment block start",
  "/*":"comment block end"
};

function CodeElement(str,typ)
{
  this.chaine = str;
  this.type=typ;
};

function Tokenizer(txt)
{
  var idx = 0;
  var tokenelements = [];
  _WORD_=0;
  _COMMENT_LINE_START_=1;
  _COMMENT_BLOCK_START_=2;
  _COMMENT_LINE_REC_=3;
  _COMMENT_BLOCK_REC_=4;



  var tokenstate = "";
  var nextstate="";
  var token="";

  for(idx=0;idx<txt.length;idx++)
  {
    // Get current char
    char = txt[idx];

    // Initialise next state precontrol
    nextstate="";

    // Find precontrol token like //,/*,*/
    if (idx+1<txt.length)
      precontrol = char+txt[idx+1];

    // Get the predefined token
    for(var i=0;i<Object.keys(_TOKEN_LIST_).length;i++)
      if (_TOKEN_LIST_[precontrol] != undefined)
      {
        nextstate = _TOKEN_LIST_[precontrol];
        break;
      }

    switch (tokenstate)
    {
      case "":
        if (nextstate == _TOKEN_LIST_["//"])
        {
          idx++;
          if (token.length>0)
          {
            codeElement = new CodeElement(token,"undefined");
            tokenelements.push(codeElement);
            token = "";
          }
          tokenstate = nextstate;
        }
        else if ( (char == ";") || (char == " ") || (char =='\n') )
          {
            if (token.length>0)
            {
              codeElement = new CodeElement(token,"undefined");
              tokenelements.push(codeElement);
            }
            token="";
          }
        else
          token += char;
      break;

      case _TOKEN_LIST_["//"]:
        if (char == '\n')
        {
          tokenstate = "";
          if (token.length>0)
          {
            codeElement = new CodeElement(token+'\n',_TOKEN_LIST_["//"]);
            tokenelements.push(codeElement);
          }

            token = "";
        }
        else {
              token += char;
        }

        break;

      default:
        break;
    }

  }

  if (token.length>0)
  {
    if (tokenstate == _TOKEN_LIST_["//"])
    codeElement = new CodeElement(token,_TOKEN_LIST_["//"]);
    else
    codeElement = new CodeElement(token,"undefined");
    tokenelements.push(codeElement);
  }

  return tokenelements;
}

function Parser(text)
{
  return Tokenizer(text);
}

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
        this.consoleoutput = "<h4 style='color:red'>No compiler error...</h4>";
    },

    parse : function()
    {
      elementsList = Parser(this.codetext);
      var retelement="<pre>";
      if (elementsList != undefined)
      for(var i=0;i<elementsList.length;i++)
      {
        if (elementsList[i].type == _TOKEN_LIST_["//"])
          retelement += "<span style='color:green'> COMMENT:"+elementsList[i].chaine+"</span>";
        else
          retelement += elementsList[i].chaine+" ";
      }
      this.consoleoutput = retelement+"</pre>";
    }
  }
})
