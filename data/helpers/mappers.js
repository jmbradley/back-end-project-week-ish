module.exports = {
    intToBoolean,
    booleanToint,
    noteToBody,
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function booleanToint(bool) {
    return bool === true ? 1 : 0;
  }
  
  function noteToBody(note) {
    const result = {
      ...note,
      completed: intToBoolean(note.completed),
    };
  
    return result;
  }
  