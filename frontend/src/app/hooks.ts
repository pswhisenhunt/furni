import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./types"


/* 
    Alias the useDispatch and useSelector hooks so that we can add types once and not in every
    file that we these hooks; we will import these into our components instead of the base hooks from react-redux.
*/
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector