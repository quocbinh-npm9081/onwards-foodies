'use client'
export default function Error(props){
    
    return <main className="error">
        <h1>An error occurred !</h1>
        <p>
           {props.error.message}
        </p>
    </main>
}