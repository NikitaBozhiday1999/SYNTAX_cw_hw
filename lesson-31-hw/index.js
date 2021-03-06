let preloaderComponent = {
    template: ` 
        <div class = "col s12 center-align" >
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `
};

let doneTodosComponent = {
    props: ['doneTodos', 'todoItems'],
    template: `
        <span class="new badge teal" 
            data-badge-caption="выполнено"> 
            {{ doneTodos.length }} из {{ todoItems.length }} 
        </span>
    `
};

let inputComponent = {
    props: ['value'],
    template:  `
        <div class="col s11">
            <input 
                class="validate"
                type="text"
                placeholder="Что сделать?"
                :value="value"
                @input="$emit('input', $event.target.value)"
            />
        </div>
    `
};

let addButtonComponent = {
    template: `
        <button class="btn waves-effect waves-light" type="submit"> 
            <slot name="add"></slot> 
        </button> 
    `
};

let todoItemComponent = {
    props: { 
        isChecked: {
            type: Boolean,
        },
    },
    template: `
    <li class = "collection-item">
        <label 
            class  = "grey-text" 
            :class = "{ 
                'text-lighten-2' : isChecked,
                'text-darken-4'  : !isChecked
            }"
        >
            <input type="checkbox" :value ="isChecked" @change ="$emit('checked-change', !isChecked)" />
            <span :style="{ textDecoration: isChecked ? 'line-through' : 'none' }"> 
                <slot></slot> 
            </span>
        </label>

        <i 
            class  = "material-icons right"
            @click = "$emit('remove-item')"
        > 
            close 
        </i>
        <i class="material-icons" 
        @click="$emit('edit-item')"
        :style="{ position: 'absolute', right: '50px' }"> edit </i>
    </li>
    `
};

let todoHeaderComponent = {
    template: `
        <li class="collection-header">
            <h4> <slot name= "title"></slot> </h4>

            <slot></slot>
        </li>
    `
};

new Vue({
    el: '#app',
    components: {
        preloader: preloaderComponent,
        todoItem: todoItemComponent,
        todoHeader: todoHeaderComponent,
        doneTodo: doneTodosComponent,
        inputCom: inputComponent,
        buttonComponent: addButtonComponent,
    },
    data: {
        isChecked: false,
        isLoading: true,
        newTodo: '',
        todoItems: [
            { id: 1, text: 'Переписать тест по Javascript', isChecked: false },
            { id: 2, text: 'Повторить Git', isChecked: false },
            { id: 3, text: 'Доделать проект по JS', isChecked: false },
            { id: 4, text: 'Выучить Vue.js', isChecked: false },
            { id: 5, text: 'Повторить HTML&CSS', isChecked: false }
        ]
    },
    computed: {
        doneTodos() {
            return this.todoItems.filter(item => item.isChecked);
        }
    },
    created() {
        this.hidePreloader();
    },
    watch: {
        doneTodos(newValue) {
            if (!this.todoItems.length) {
                M.toast({ html: 'Список дел пуст!' });
            }
            else if (newValue.length === this.todoItems.length) {
                M.toast({ html: 'Все дела выполнены!' });
            }
        }
    },
    methods: {
        addNewTodo() {
            if (!this.newTodo.length) return;

            this.todoItems.push({
                id        : this.todoItems.length + 1,
                text      : this.newTodo,
                isChecked : false
            });

            this.newTodo = '';
        },

        hidePreloader() {
            setTimeout(() => this.isLoading = false, 2000);
        },

        removeTodoItem(itemIdx) {
            this.todoItems.splice(itemIdx, 1);
        },
        editNewTodo(itemIdx) {
            let newEdit = prompt('Введите новое задание');
            console.log(newEdit);
            this.todoItems[itemIdx].text = newEdit;
        }
    }
});
