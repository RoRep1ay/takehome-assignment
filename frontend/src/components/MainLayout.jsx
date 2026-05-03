import { MenuBar } from "./MenuBar"

export const MainLayout = ({ children }) => {
  return <>
    <MenuBar />

    <main>{children}</main>

  </>
}
