{
  window.Run5 = function(data)
  {
    const formatted = FormatData(data)
    console.log('Data:', formatted)
    return [
      MaxSeatID(formatted),
      MissingSeatID(formatted)
    ]
  }


  function FormatData(data)
  {
    return data.split('\n')
      .filter(el => !!el)
      .map(str => str.trim().replace(/F|L/g,'0').replace(/B|R/g,'1'))
      .map(str => ({row: parseInt(str.slice(0, 7), 2), col: parseInt(str.slice(7), 2)}))
  }


  function ComputeSeatID(entry)
  {
    return entry.row * 8 + entry.col
  }
  
  function MaxSeatID(data)
  {
    return Math.max(...data.map(ComputeSeatID))
  }

  function MissingSeatID(data)
  {
    return data
      .map(ComputeSeatID)
      .sort((a,b) => a-b)
      .find((seatID, index, seatIDs) => seatID+2 === seatIDs[index+1]) + 1 // find the ID between
  }
}