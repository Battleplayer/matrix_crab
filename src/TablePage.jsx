import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const TablePage = () => {
  const [M, setM] = useState('');
  const [N, setN] = useState('');
  const [X, setX] = useState(6);
  const [matrix, setMatrix] = useState([]);
  const [nextObj, setNextObj] = useState({});
  const [searchedArr, setSearchedArr] = useState([]);
  const [isTotalEnter, setTotalEnter] = useState(false);
  const [percentArr, setPercentArr] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const arr = [];
    const someObj = {};
    for (let i = 0; i < M; i++) {
      arr.push([]);
      for (let j = 0; j < N; j++) {
        let key = uuidv4();
        arr[i].push(key);
        someObj[key] = Math.round(Math.random() * 900 + 100);
      }
    }
    setNextObj(someObj);
    setMatrix(arr);
  }, [M, N]);

  const totalInRow = useMemo(() => {
    if (matrix.length <= 0) return 0;
    const percents = [];
    const val = matrix.map((item) => {
      if (!item.length) return 0;
      const sum = item.reduce((acc, el) => acc + nextObj[el], 0);
      let newArr = item.map((el) => Math.round((nextObj[el] / sum) * 100));
      percents.push(newArr);
      return sum;
    });
    setPercentArr(percents);
    return { ...val };
  }, [matrix, nextObj]);

  const arrayColumn = useCallback((arr, n) => arr.map((x) => x[n]), []);

  const totalInCol = useMemo(() => {
    if (matrix.length <= 0) return 0;
    let obj = {};
    for (let i = 0; i < matrix[0].length; i++) {
      obj[i] = arrayColumn(matrix, i).reduce((acc, el) => acc + nextObj[el], 0);
    }
    return obj;
  }, [arrayColumn, matrix, nextObj]);

  const handleInc = useCallback(
    (el) => {
      const newVal = nextObj[el] + 1;
      setNextObj({ ...nextObj, [el]: newVal });
    },
    [nextObj]
  );

  const handleHover = useCallback(
    (el_number) => {
      if (!X) return;

      let defaultCount = X;
      const newArr = [];

      const searchedArray = Object.keys(nextObj)
        .map((el) => ({ name: el, value: nextObj[el] }))
        .sort((a, b) => a.value - b.value);

      const searchedIndex = searchedArray.findIndex((el) => el.name === el_number);

      for (let i = 1; i < X + 1; i++) {
        if (searchedArray[searchedIndex - i] && defaultCount > 0) {
          newArr.push(searchedArray[searchedIndex - i].name);
          defaultCount -= 1;
        }
        if (searchedArray[searchedIndex + i] && defaultCount > 0) {
          newArr.push(searchedArray[searchedIndex + i].name);
          defaultCount -= 1;
        }
      }
      setSearchedArr(newArr);
    },
    [X, nextObj]
  );

  const handleHoverRemove = useCallback(() => setSearchedArr([]), []);

  const totalEnter = useCallback((i) => {
    setActiveIndex(i);
    setTotalEnter(true);
  }, []);

  const totalLeave = useCallback(() => {
    setTotalEnter(false);
    setActiveIndex(null);
  }, []);

  const addRow = useCallback(() => {
    const arr = [];
    const someObj = {};
    for (let j = 0; j < N; j++) {
      let key = uuidv4();
      arr.push(key);
      someObj[key] = Math.round(Math.random() * 900 + 100);
    }
    setNextObj({ ...nextObj, ...someObj });
    setMatrix([...matrix, arr]);
  }, [N, matrix, nextObj]);

  const removeRow = useCallback(
    (index) => {
      const defaultArr = matrix.slice();
      const newObj = JSON.parse(JSON.stringify(nextObj));
      const removedArr = defaultArr.splice(index, 1)[0];

      removedArr.forEach((el) => delete newObj[el]);

      setNextObj(newObj);
      setMatrix(defaultArr);
    },
    [matrix, nextObj]
  );

  return (
    <Container>
      <Row>
        <Col>
          <div className="body-inner">
            <label className="data-input">
              M <input type="number" value={M} onChange={(e) => setM(e.target.value)} />
            </label>
            <label className="data-input">
              N <input type="number" value={N} onChange={(e) => setN(e.target.value)} />
            </label>
            <label className="data-input">
              X <input type="number" value={X} onChange={(e) => setX(e.target.value)} />
            </label>
            <Button onClick={addRow} className="my-4">
              Add row
            </Button>
          </div>

          {matrix.length > 0 && matrix[0].length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {matrix[0].map((el, index) => (
                    <th key={index}>
                      <b>{index + 1}</b>
                    </th>
                  ))}
                  <th key="total">total</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, index) => (
                  <tr key={index}>
                    {row.map((el, i) => (
                      <td
                        onMouseEnter={() => handleHover(el)}
                        onMouseLeave={handleHoverRemove}
                        onClick={() => handleInc(el)}
                        className={`bcg ${searchedArr.includes(el) ? 'active' : ''}`}
                        key={el}
                      >
                        {isTotalEnter && activeIndex === index ? percentArr[index][i] : nextObj[el]}

                        {isTotalEnter && activeIndex === index && (
                          <span className="bcg-active" style={{ width: `${percentArr[index][i]}%` }} />
                        )}
                      </td>
                    ))}
                    <td
                      className="last-item"
                      key="last-item"
                      onMouseEnter={() => totalEnter(index)}
                      onMouseLeave={totalLeave}
                    >
                      <b>{totalInRow[index]}</b>
                    </td>
                    <td key={Math.random()} style={{ width: 0 }}>
                      <Button variant="danger" size={'sm'} onClick={() => removeRow(index)}>
                        -
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  {matrix[0].map((lastRow, index) => (
                    <td key={index * totalInCol[index]}>
                      <b>{totalInCol[index]}</b>
                    </td>
                  ))}
                  <td key="last">-</td>
                </tr>
              </tbody>
            </Table>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default TablePage;
