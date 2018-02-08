import Footer from "./components/footer/Footer";
import Item from "./components/item/Item";

require('style/base.css')
require('style/index.css')


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todosData: [],
            inputVal: '',  // 这里是输入的数据
            view: 'all'
        }

        this.handlerKeyDownPost = this.handlerKeyDownPost.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    // 输入数据修改
    inputChange(ev){
        this.setState({
            inputVal: ev.target.value
        })
    }

    // 回车显示一条todo
    handlerKeyDownPost(ev){
        if(ev.keyCode != 13){
            return;
        }

        let { inputVal }= this.state;
        inputVal = inputVal.trim();

        if(inputVal === ''){
            return ;
        }

        let todo = {};
        todo.id = new Date().getTime();
        todo.val = inputVal;
        todo.hasCompleted = false;

        let {todosData} = this.state;

        todosData.push(todo);

        this.setState({
            todosData: todosData,
            inputVal: ''
        })
    }

    // 单个点选
    onToggle(todo){
        let { todosData } = this.state;
        todosData.map( (elt,i)=>{
            if(elt.id == todo.id){
                elt.hasCompleted = !elt.hasCompleted;
            }
        } );

        this.setState({
            todosData
        })
    }

    // 删除一条todo
    onDestroy(todo){
        let { todosData } = this.state;
        todosData = todosData.filter( (elt)=>{
            return elt.id != todo.id;
        } );

        this.setState({
            todosData
        })
    }

    // 更改视图
    changeView(view){
        this.setState({
            view: view
        })
    }

    // 清除已完成的项
    onClearCompleted(){
        let { todosData } = this.state;
        todosData = todosData.filter( (elt, i) => {
            return !elt.hasCompleted;
        });
        this.setState({
            todosData
        });
    }

    render(){
        let {
            handlerKeyDownPost,
            inputChange,
            onToggle,
            onDestroy,
            onClearCompleted,
            changeView
        } = this;

        let { todosData, inputVal, view } = this.state;

        let itemBox = null,
            items = null,
            footer = null,
            leftCount = 0;

        items = todosData;

        items = todosData.filter( (elt, i) => {
            if(!elt.hasCompleted){
                leftCount ++;
            }

            console.log(view);
            switch (view) {
                case 'active':
                    return !elt.hasCompleted;
                case 'completed':
                    return elt.hasCompleted;
                default:
                    return true;
            }
        } )

        // items 成为包含有多个<Items />的数组
        items = items.map( (elt, i) => {
            return (
                <Item {...{
                    todo: elt,
                    onToggle,
                    onDestroy
                }}
                    key={i}
                />
            )
        })

        if(todosData.length){
            itemBox = (
                <section className={"main"}>
                    <input
                        className={"toggle-all"}
                        type={"checkbox"}
                    />
                    <ul className={"todo-list"}>
                        {items}
                    </ul>
                </section>
            );
            footer = (
                <Footer {...{
                    showClearButton: leftCount < todosData.length ? true : false,
                    leftCount,
                    onClearCompleted,
                    changeView,
                    view
                }}
                />
            )
        }

        return (
            <div>
                <header className={"header"}>
                    <h1>todos</h1>
                    <input
                        className={"new-todo"}
                        type={"text"}
                        value={inputVal}
                        onKeyDown={handlerKeyDownPost}
                        onChange={inputChange}
                    />
                </header>
                {itemBox}
                {footer}
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)

if(module.hot){
    module.hot.accept();
}



