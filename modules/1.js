{
  window.Run1 = function(data)
  {
    const formatted = data.split('\n').map(el => parseInt(el, 10)).filter(el => !Number.isNaN(el))
    console.log('Data:', formatted)
    return [
      Algorithm1([...formatted]),
      Algorithm2([...formatted])
    ]
  }


  function Algorithm1(data)
  {
    // Find the two that sum to 2020 (i.e. solve: a + b = 2020)
    
    // Find min
    const min = Math.min(...data)
    const max = 2020 - min
    
    // Filter any out of bounds (> 2020-min)
    data = data.filter(el => el <= max)
    
    // Triangular compare with early exit to find result
    for (let i = 0; i < data.length-1; i++)
    {
      for (let j = i; j < data.length; j++)
      {
        if (data[i] + data[j] === 2020)
        {
          return data[i] * data[j]
        }
      }
    }
  }


  function Algorithm2(data)
  {  
    // Find the three that sum to 2020 (i.e. solve: a + b + c = 2020)
    
    // Find first min
    const min1 = Math.min(...data)
    const min2 = Math.min(...data.filter(data => data !== min1))
    const max = 2020 - min1 - min2 // this is the ABSOLUTE maximum possible
    
    // Filter any out of bounds (> 2020-min)
    data = data.filter(el => el <= max)

    // Pyramid compare with early exit to find result
    for (let i = 0; i < data.length-2; i++)
    {
      for (let j = i; j < data.length-1; j++)
      {
        for (let k = j; k < data.length; k++)
        {
          if (data[i] + data[j] + data[k] === 2020)
          {
            return data[i] * data[j] * data[k]
          }
        }
      }
    }
  }
}