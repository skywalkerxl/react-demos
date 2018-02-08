export default class Item extends React.Component {
    constructor(props){
        super(props);
    }



    render(){

        let { } = this;

        let {
            todo,
            onToggle,
            onDestroy
        } = this.props;

        let itemsClassName = todo.hasCompleted ? "completed" : "";

        return (
            <li className={itemsClassName}>
                <div className={"view"}>
                    <input
                        className={"toggle"}
                        type={"checkbox"}
                        checked={todo.hasCompleted}
                        onClick={ev => onToggle(todo)}
                    />
                    <label>{todo.val}</label>
                    <button
                        className={"destroy"}
                        onClick={ev => onDestroy(todo)}
                    ></button>
                </div>
                <input className={"edit"}/>
            </li>
        );
    }
}