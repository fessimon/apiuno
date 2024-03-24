import { useFetch } from './assets/useFetch'
import './App.css'

function App() {

  const { data, loading, error, apiCargada, handleCancelRequest } = useFetch('https://jsonplaceholder.typicode.com/users')

  return (
    <>
      <div className='App'>
        <h1>Fetch como un PRO</h1>

        {!apiCargada && <button onClick={handleCancelRequest}>Cancelar peticion</button>}
        <div className='card'>
          {
            error && <p> {error}</p>
          }
          {
            loading && <p>Cargando por favor espere...</p> //si loading es true renderizar loading
          }
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            {
              data?.map((user) => (
                <tbody key={user.id}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                  </tr>
                </tbody>

              ))}
          </table>


        </div>
      </div>

    </>
  )
}

export default App
