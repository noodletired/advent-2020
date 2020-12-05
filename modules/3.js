{
  window.Run3 = function(data)
  {
    const formatted = FormatData(data)
    console.log('Data:', formatted)
    return [
      Algorithm1([...formatted]),
      Algorithm2([...formatted])
    ]
  }


  function FormatData(data)
  {
    return data.split('\n').filter(el => !!el).map(str => str.trim())
  }


  function Algorithm1(data)
  {
    const width = data[0].length
    let col = -3

    return data.reduce( (accumulator, row) => accumulator + (row.charAt( (col+=3,col%=width) )==='#'), 0)
  }


  function Algorithm2(data)
  {  
    const width = data[0].length
    const checkTree = (rowskip, colskip) => {
      return data.filter((row,index) => !(index % rowskip)).reduce( (accumulator, row, index) => accumulator + (row.charAt( index * colskip % width )==='#'), 0)
      //let col = -colskip
      //return data.reduce( (accumulator, row, index) => accumulator + (!(index%rowskip) ? (row.charAt( (col+=colskip,col%=width) )==='#') : 0), 0)
    }
    
    return [ [1,1], [1,3], [1,5], [1,7], [2,1] ].reduce( (accumulator, args) => accumulator * checkTree(...args), 1)
  }
}