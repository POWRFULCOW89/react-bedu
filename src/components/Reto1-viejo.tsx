import './Reto1.css';

interface ChildrenProps {
    children: JSX.Element[]
}

const Plato = () => <div className="plato"/>

const Cubierto = () => <div className="cubierto"/>

const Mantel = ({children}: ChildrenProps) => <div className="mantel">{children}</div>

const Reto1 = () => {
    return  (<div className="container">
        <Mantel>
            <Cubierto />
            <Plato />
            <Cubierto />
        </Mantel>
        <Mantel>
            <Cubierto />
            <Plato />
            <Cubierto />
        </Mantel>
        <Mantel>
            <Cubierto />
            <Plato />
            <Cubierto />
        </Mantel>
    </div>);
}
    

export default Reto1;