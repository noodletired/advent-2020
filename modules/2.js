{
  window.Run2 = function(data)
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
    data = data.split('\n').filter(el => !!el)
    return data.map(el => {
      const [policy, password] = el.split(': ')
      let [min, max] = policy.split('-')
      min = parseInt(min, 10);
      max = parseInt(max, 10);
      const character = policy.slice(-1)
      return {min, max, character, password}
    })
  }


  function Algorithm1(data)
  {
    // Confirm number of occurrences of 'character' are between 'min' and 'max'
    return data.reduce( (accumulator, {min, max, character, password}) => {
      const len = password.split(character).length - 1
      if ((len >= min) && (len <= max))
        return accumulator + 1
      else
        return accumulator
    }, 0)
  }


  function Algorithm2(data)
  {  
    // Confirm exactly ONE occurrence of 'character' is at one-indexed positions 'min' and 'max'
    return data.reduce( (accumulator, {min, max, character, password}) => {
      const atMin = password[min-1] === character
      const atMax = password[max-1] === character

      if ( (+atMin) ^ (+atMax) )
        return accumulator + 1
      else
        return accumulator
    }, 0)
  }
}