{
  window.Run8 = function(data)
  {
    const formatted = FormatData(data)
    console.log('Data:', formatted)
    return [
      RunUntilRerun(formatted),
      FixAndRun(formatted)
    ]
  }


  function FormatData(data)
  {
    // Map data to [ [colour, [colour, count], ...], ...] ]
    // Access e.g. rules[colour].keys().contains(x) to check if a bag can hold another bag
    return data
      .split(/\n/gm)              // each rule is separated by a line break
      .filter(Boolean)            // filter out empty results
      .map(line => line
        .split(' ')
        .reduce( (operation, number) => [operation, parseInt(number, 10)] ) // tuple(op, arg)
      )
  }


  // Returns new [pos, acc]
  function Evaluate([op, arg], [pos, acc])
  {
    return (
      (op === 'nop') ? [pos+1, acc] :
      (op === 'acc') ? [pos+1, acc+arg] :
      (op === 'jmp') ? [pos+arg, acc] :
      console.error('Unknown operation')
    )
  }


  // Returns the memory [pos, acc] if a newly evaluated position has been in memory before
  function RunUntilRerun(data, memory=[[0, 0]])
  {
    return Evaluate( data[memory.slice(-1).pop()[0]], memory.slice(-1).pop() )
      .reduce( (pos, acc) =>
        memory.some( ([visitedPos]) => visitedPos === pos ) 
          ? memory.slice(-1).pop()
          : RunUntilRerun(data, [...memory, [pos, acc]])
      )
  }


  // Runs the program until it ends or gets stuck in a loop
  // returns acc value or null
  function TryRunToEnd(data, memory=[[0, 0]])
  {
    return Evaluate( data[memory.slice(-1).pop()[0]], memory.slice(-1).pop() )
      .reduce( (pos, acc) =>
        pos === data.length
        ? acc
        : (pos > data.length || pos < 0) || memory.some( ([visitedPos]) => visitedPos === pos ) 
          ? null
          : TryRunToEnd(data, [...memory, [pos, acc]])
      )
  }


  // Brute force approach
  // - Finds all indices of nop/jmp
  // - Maps each instance to TryRunToEnd with modified data where nop/jmp are swapped
  // - Filters a valid acc result
  function FixAndRun(data)
  {
    return data
      .reduce( (indices, [op, arg], index) => // reduce to indices where nop/jmp
        op === 'nop' || op === 'jmp' ? [...indices, index] : indices
        , []
      ).map( replaceIndex =>
        TryRunToEnd([
          ...data.slice(0, replaceIndex),
          data[replaceIndex].reduce( (op, arg) => op === 'nop' ? ['jmp', arg] : ['nop', arg] ), // swap ops
          ...data.slice(replaceIndex+1)
        ])
      ).find(Boolean)
  }
}