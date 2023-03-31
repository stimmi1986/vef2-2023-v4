import { BackButton } from '../components/Button/BackButton'

export function NotFound() {
    return (
        <>
            <h2>Síða fannst ekki</h2>
            <section><BackButton nameOfClass={'prim'} /></section>
        </>
    )
}