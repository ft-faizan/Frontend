import  Signin_signup_form from "../components/auth_compo/sigin_siginup_form.jsx";
function Super_Admin_Page() {
    return (
       <>
        <h1>Super Admin</h1>
          <Signin_signup_form showRole={true}/>
       </>
    );
}

export default Super_Admin_Page;