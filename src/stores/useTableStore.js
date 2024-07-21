import { defineStore } from 'pinia';

export const useTableStore = defineStore('tableStore', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('items')) || [
            { id: 1, title: 'Название 1', name: 'Иванов Иван Иванович', phone: '+7 (111) 111-11-11' },
            { id: 2, title: 'Название 2', name: 'Петров Петр Петрович', phone: '+7 (111) 111-11-11' },
            { id: 3, title: 'Название 3', name: 'Алексеев Алексей Алексеевич', phone: '+7 (111) 111-11-11' },
            { id: 4, title: 'Название 4', name: 'Александров Александр Александрович', phone: '+7 (111) 111-11-11' },
            { id: 5, title: 'Название 5', name: 'Викторов Виктор Викторович', phone: '+7 (111) 111-11-11' },
            { id: 6, title: 'Название 6', name: 'Артемов Артем Артемович', phone: '+7 (111) 111-11-11' },
            { id: 7, title: 'Название 7', name: 'Максимов Максим Максимович', phone: '+7 (111) 111-11-11' },
            { id: 8, title: 'Название 8', name: 'Михайлов Михаил Михаилович', phone: '+7 (111) 111-11-11' },
        ],
    }),
    actions: {
        addItem(item) {
            // Generate a unique id for the new item
            const newItem = { ...item, id: Date.now() };
            this.items.push(newItem);
            this.saveToLocalStorage();
        },
        deleteItem(id) {
            const index = this.items.findIndex(item => item.id === id);
            if (index !== -1) {
                this.items.splice(index, 1);
                this.saveToLocalStorage();
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('items', JSON.stringify(this.items));
        },
    },
    getters: {
        filteredItems: (state) => (searchQuery) => {
            if (typeof searchQuery !== 'string') return state.items;

            return state.items.filter(item =>
                item.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        },
        sortedItems: (state) => (searchQuery, sortKey, sortAsc) => {
            const items = state.filteredItems(searchQuery);
            return items.slice().sort((a, b) => {
                if (sortKey) {
                    const result = a[sortKey]?.localeCompare(b[sortKey]);
                    return sortAsc ? result : -result;
                }
                return 0;
            });
        },
    },
});