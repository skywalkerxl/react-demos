export default class Footer extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        let clearBtn = {}

        let {
            showClearButton,
            leftCount,
            onClearCompleted,
            changeView,
            view
        } = this.props;

        if(showClearButton){
            clearBtn = (
                <button
                    className={"clear-completed"}
                    onClick={ev => onClearCompleted()}
                >
                    clear all completed
                </button>
            )
        }else{
            clearBtn = null;
        }



        return (
            <footer className={"footer"}>
                <span className={"todo-count"}>
                    <strong>{leftCount}</strong>
                    <span>item left</span>
                </span>
                <ul className={"filters"}>
                    <li>
                        <a
                            className={ view == "all" ? "selected" : "" }
                            href={"#/all"}
                            onClick={ ev => changeView('all')}
                        >All</a>
                    </li>
                    <li>
                        <a
                            className={ view == 'active' ? "selected" : "" }
                            href={"#/active"}
                            onClick={ ev => changeView('active')}
                        >Active</a>
                    </li>
                    <li>
                        <a
                            className={ view == "completed" ? "selected" : "" }
                            href={"#/completed"}
                            onClick={ ev => changeView('completed')}
                        >Completed</a>
                    </li>
                </ul>
                {clearBtn}
            </footer>
        )
    }
}