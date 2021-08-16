import {useCallback, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

const Table = () => {
  const [M, setM] = useState('');
  const [N, setN] = useState('');
  const [X, setX] = useState('');
  const [matrix, setMatrix] = useState([]);
  const [nextObj, setNextObj] = useState({});
  const [totalInRow, setTotalInRow] = useState({});
  const [totalInCol, setTotalInCol] = useState({});

  useEffect(() => {
    const arr = [];
    const someObj = {};
    const totalRow = {};
    const totalCol = {};
    for (let i = 0; i < M; i++) {
      arr.push([]);
      for (let j = 0; j < N; j++) {
        let key = uuidv4();
        arr[i].push(key);
        const number = Math.round(Math.random() * 900 + 100);
        someObj[key] = number;
        totalRow[i] = (totalRow[i] || 0) + number;
        totalCol[j] = (totalCol[j] || 0) + number;
      }
    }
    setNextObj(someObj);
    setMatrix(arr);
    setTotalInRow(totalRow);
    setTotalInCol(totalCol);

  }, [M, N]);

  // const calculateTotal = useCallback(() => {
  //   console.log('call');
  //   const totalRow = {};
  //   const totalCol = {};
  //   for (let i = 0; i < M; i++) {
  //     for (let j = 0; j < N; j++) {
  //       totalRow[i] = (totalRow[i] || 0);
  //       totalCol[j] = (totalCol[j] || 0);
  //     }
  //   }
  //   setTotalInRow(totalRow);
  //   setTotalInCol(totalCol);
  // },[])

  // console.log(matrix);
  // console.log(totalInCol);

  const handleInc = useCallback((el) => {
    const newVal = nextObj[el] + 1;
    setNextObj(prev => ({...prev.nextObj, el: newVal}));
  }, [nextObj]);

  return (
    <div style={{width: 1200, margin: 40}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label style={{marginTop: 15}}>M <input type="number" value={M} onChange={e => setM(e.target.value)}/></label>
        <label style={{marginTop: 15}}>N <input type="number" value={N} onChange={e => setN(e.target.value)}/></label>
        <label style={{marginTop: 15}}>X <input type="number" value={X} onChange={e => setX(e.target.value)}/></label>
      </div>
      {
        matrix.length > 0 &&
        <table>
          <tr>
            {matrix[0].map((el, index) => <th>{index}</th>)}
            <th>total</th>
          </tr>
          <tbody>
          {
            matrix.map((row, index) => (
              <tr>
                {row.map(el => {
                  return (<td onClick={() => handleInc(el)} key={el}>{nextObj[el]}</td>)
                })}
                <td>{totalInRow[index]}</td>
              </tr>
            ))
          }
          <tr>
            {
              matrix[0].map((lastRow, index) => (
                <td key={index}>{totalInCol[index]}</td>
              ))
            }
          </tr>
          </tbody>
        </table>}
    </div>
  )
}

export default Table
