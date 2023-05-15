import './Contact.css'

const Contact = () => {

    return (

        <div className='contact-container'>
            <img src='https://media.licdn.com/dms/image/D4D03AQFQHd4_WKkBXw/profile-displayphoto-shrink_800_800/0/1675851893143?e=1691625600&v=beta&t=2sj8L1BZC6iexqVucpAzAzzjFZPBBEJtWYyP4qO1Eo0' alt='my' />
            <div className='contact-info'>
                <h1>Juan Antonio Caballero</h1>
                <h2>Web Developer</h2>
                <hr />
                <h3>j.antoniocaballero@hotmail.es</h3>
                <h4>628149253</h4>
                <a href="https://github.com/JuanAntoni0Caballero" target="_blank" rel="noreferrer"> GitHub</a>
            </div>
        </div >
    )
}

export default Contact