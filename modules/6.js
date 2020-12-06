{
  window.Run6 = function(data)
  {
    const formatted = FormatData(data)
    console.log('Data:', formatted)
    return [
      CountUnique(formatted),
      CountIntersection(formatted)
    ]
  }


  function FormatData(data)
  {
    return data.split(/\n\n/gm)   // each group is separated by a two-line break
      .filter(el => !!el)         // filter out empty results
  }


  function CountUnique(groups)
  {
    return groups
      .map(str => new Set(str.match(/[a-z]/gm)))    // map to Array< Set<char> >
      .reduce( (count, set) => count + set.size, 0 )
  }


  function CountIntersection(groups)
  {
    // map each group to entries,
    // perform intersection between entries,
    // sum count of intersections over all groups
    return groups
      .map(str => str
        .split('\n').filter(el => !!el)
        .map( entry => entry.match(/[a-z]/g) )
        .reduce( (intersection, entry, i, arr) => [...intersection].filter(ch => entry.includes(ch)))
      )
      .reduce( (count, intersection) => count + intersection.length, 0 )
  }
}