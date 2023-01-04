import axios from 'axios';
import { useEffect,useState } from 'react'
import {Container,Row,Col,Navbar,Table} from 'react-bootstrap';
import Global from './Global';

export function App() {

  const [url, setUrl] = useState(Global.urlApiFiles);
  const [datos, setDatos] = useState({});
  const [errorAPI, setErrorAPI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [respuestaAPI, setRespuestaAPI] = useState([]);
 
  useEffect(() => {
    const consultaAPI = async () => {
      setErrorAPI(null);
      setLoading(true);
 
      try {
        const instance = axios.create({baseURL: url});
        const {data} = await instance.get();
        console.log(data);
        setRespuestaAPI(data);

      } catch (error) {
        setErrorAPI(error.response);
      }
 
      setLoading(false);
    };
 
    consultaAPI();
  }, [datos]);
  
  return (
    <>
    <Container fluid>
      <Row>
        <Col md={12}>
          <Navbar className='bg-danger'> 
            <Container>
              <h3 className='text-white'>React Test App</h3>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col md={12}>
          <Container fluid>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                { loading === false && (
                  respuestaAPI.map( (resp) => {
                    return (
                      <tr>
                        <td> {resp.file} </td>
                        <td> {resp.lines[0]['text']} </td>
                        <td> {resp.lines[0]['number']} </td>
                        <td> {resp.lines[0]['hex']} </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
    </>
  )
}

