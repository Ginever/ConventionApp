import { useSelector } from "react-redux";
import ResponsiveAppBar from "./Appbar";
import { selectPermissions } from "../features/userData/userDataSlice";

export default function Register() {
    const permissions = useSelector(selectPermissions);

    return (
        <>
            <ResponsiveAppBar />
            {permissions.level === 0 ? <h1>You do not have permisson to see this page</h1> :
                <h1>Register</h1>
            }   
        </>
    )
}