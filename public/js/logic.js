//function finds the index of an item in the sitterList and returns it
var findSitterIndex = function(id, sitter){
  console.log("SITTER ID", id);
  for(var i = 0; i < sitter.length; i++){
    if(sitter[i]._id == id){
      var index = i;
    }
  }
  console.log("SITTER INDEX IN LOGIC:", index);
  return index;
};


module.exports = findSitterIndex;
