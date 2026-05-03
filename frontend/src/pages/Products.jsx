import { useProductsApi } from '../hooks/useProductsApi'

export const Products = () => {
  const { data, isLoading, error } = useProductsApi()
  console.log('data ', data)
  if (isLoading) {
    return <div>Loading</div>
  }
  return <>
    <div>Product</div>
    <table>
      <thead>
      <tr>
        <th>
          ID
        </th>
        <th>
          Product Name
        </th>
        <th>
          In Price
        </th>
        <th>
          Price
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => {
        return <tr key={item.id}>
          <td>
            {item.id}
          </td>

          <td>
            {item.name}
          </td>
          <td>
            {item.in_price}
          </td>
          <td>
            {item.price}
          </td>
        </tr>

      })}
    </tbody>
    </table>
  </>
}
