<template>
    <div class="container">
        <div class="header">
            <input v-model="searchQuery" placeholder="Поиск по ФИО" class="search-input" />
            <button class="add-button" @click="showModal">Добавить</button>
        </div>
        <AddRecordModal
            :isVisible="isModalVisible"
            @close="closeModal"
            @submit="addItem"
        />

        <table>
            <thead>
            <tr>
                <th @click="sortBy('title')">
                    Название
                    <span v-if="sortKey === 'title'">{{ sortAsc ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('name')">
                    ФИО
                    <span v-if="sortKey === 'name'">{{ sortAsc ? '▲' : '▼' }}</span>
                </th>
                <th>Телефон</th>
                <th style="width: 50px"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in paginatedItems" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
                <td class="center" style="width: 50px"><button @click="deleteItem(item.id)" class="close-button">✕</button></td>
            </tr>
            </tbody>
        </table>

        <div class="pagination">
            <button :disabled="currentPage === 1" @click="prevPage">←️</button>
            <span>Страница {{ currentPage }}</span>
            <button :disabled="currentPage === totalPages" @click="nextPage">→️</button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTableStore } from '../stores/useTableStore';
import AddRecordModal from './AddRecordModal.vue';

export default {
    components: {
        AddRecordModal,
    },
    setup() {
        const tableStore = useTableStore();
        const searchQuery = ref('');
        const currentPage = ref(1);
        const itemsPerPage = 5;
        const sortKey = ref('');
        const sortAsc = ref(true);
        const isModalVisible = ref(false);

        const filteredItems = computed(() => tableStore.filteredItems(searchQuery.value));
        const sortedItems = computed(() => tableStore.sortedItems(searchQuery.value, sortKey.value, sortAsc.value));

        const paginatedItems = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return sortedItems.value.slice(start, end);
        });

        const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

        const sortBy = (key) => {
            if (sortKey.value === key) {
                sortAsc.value = !sortAsc.value;
            } else {
                sortKey.value = key;
                sortAsc.value = true;
            }
        };

        const deleteItem = (id) => {
            tableStore.deleteItem(id);
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const showModal = () => {
            isModalVisible.value = true;
        };

        const closeModal = () => {
            isModalVisible.value = false;
        };

        const addItem = (item) => {
            tableStore.addItem(item);
        };

        return {
            searchQuery,
            currentPage,
            sortKey,
            sortAsc,
            paginatedItems,
            totalPages,
            sortBy,
            deleteItem,
            prevPage,
            nextPage,
            showModal,
            closeModal,
            isModalVisible,
            addItem,
        };
    },
};
</script>

<style>

.container {
    display: flex;
    flex-direction: column;
}
table {
    border-collapse: collapse;
    font-size: 20px;
    margin-top: 20px;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

th {
    cursor: pointer;
    background-color: #f2f2f2;
    font-weight: 700;
    text-align: left;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px;
    width: 50vh;
}

td.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-input {
    font-size: 20px;
    padding: 10px 0 10px 10px;
    border: solid black 2px;
    border-radius: 5px;
    margin-bottom: 30px;
}

.add-button {
    font-size: 20px;
    padding: 10px;
    margin-bottom: 30px;
    float: right;
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    border: solid black 2px;
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}

.add-button:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-button {
    background: transparent;
    border: none;
    font-size: 25px;
    cursor: pointer;
}

.close-button:hover {
    color: red;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    align-self: end;
}

.pagination button {
    background:transparent;
    padding-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 40px;
    border: none;
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}

.pagination button:disabled {
    cursor: not-allowed;
    background:transparent;
    padding-bottom: 10px;
    border-radius: 5px;
    font-size: 40px;
    border: none;
}

.pagination span {
    margin: 0 10px;
    font-size: 25px;
}
</style>