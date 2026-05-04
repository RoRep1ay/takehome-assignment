import { MenuBar } from "./MenuBar"

export const MainLayout = ({ children }) => {
  return <>
    <MenuBar />

    <div>{children}</div>
  </>
}
