export default function Layout(props) {

    const {children} = props;

  return (
    
    <>
        <header>
            <h1 className="text-gradient"
            >
                COPACETIC
            </h1>

        </header>


        <main>
            {children}

        </main>
        <footer>
            <small>Created By</small>
            <a href="https://www.linkedin.com/in/mukem-maxcel/" target="blank">
            
            <img src="https://media.licdn.com/dms/image/v2/D5603AQE-N8NwxeMucw/profile-displayphoto-shrink_200_200/B56ZeaqXXMHoAY-/0/1750646488041?e=1757548800&v=beta&t=E2LO34Ym32Q4KEByP8Fx8D9WKyrfUP4wwfHvH_lk1_E" alt="pfp" />
            :@maxcel
            <i className="fa-brands fa-linkedin"></i>
            </a>
        </footer>
    </>
    
  )
}