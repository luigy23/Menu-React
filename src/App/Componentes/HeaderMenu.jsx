import React from 'react'

const HeaderMenu = ({children}) => {
  return (
    <div className="w-full bg-slate-white items-center gap-4 px-4 py-2 flex flex-col justify-center ">
        {children}
    </div>
  )
}

export default HeaderMenu
