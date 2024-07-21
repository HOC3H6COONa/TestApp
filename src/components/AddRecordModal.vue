<template>
    <div v-if="isVisible" class="modal">
        <div class="modal-content">
            <h1 class="title">Добавить организацию</h1>
            <form @submit.prevent="handleSubmit">
                <div class="input-block">
                    <div>
                        <input id="title" v-model="newItem.title" placeholder="Название..." autocomplete="off" class="input" required/>
                    </div>
                    <div>
                        <input
                            id="phone"
                            v-model="newItem.phone"
                            @input="formatPhone"
                            placeholder="Номер телефона..."
                            autocomplete="off"
                            class="input"
                            required
                        />
                    </div>
                    <div>
                        <input id="name" v-model="newItem.name" placeholder="ФИО директора..." class="input" autocomplete="off" required/>
                    </div>
                </div>
                <div class="buttons">
                    <button type="button" class="button" @click="handleClose">Отмена</button>
                    <button type="submit" class="button" :disabled="!isFormValid">Ок</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            newItem: {
                title: '',
                name: '',
                phone: ''
            }
        };
    },
    computed: {
        isFormValid() {
            return this.newItem.title && this.newItem.name && this.newItem.phone;
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('submit', this.newItem);
            this.resetForm();
            this.handleClose();
        },
        handleClose() {
            this.$emit('close');
        },
        resetForm() {
            this.newItem = {
                title: '',
                name: '',
                phone: ''
            };
        },
        formatPhone(event) {
            let input = event.target.value.replace(/\D/g, '').substring(0, 11);
            let areaCode = input.substring(1, 4);
            let middle = input.substring(4, 7);
            let lastPart = input.substring(7, 9);
            let lastPart2 = input.substring(9, 11);

            if (input.length > 6) {
                event.target.value = `+7 (${areaCode}) ${middle}-${lastPart}-${lastPart2}`;
            } else if (input.length > 3) {
                event.target.value = `+7 (${areaCode}) ${middle}`;
            } else if (input.length > 1) {
                event.target.value = `+7 (${areaCode}`;
            } else {
                event.target.value = `+7`;
            }

            this.newItem.phone = event.target.value;
        }
    }
};
</script>

<style>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 40px;
    border-radius: 5px;
    width: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
}

.title {
    justify-self: center;
    align-items: start;
    font-weight: 600;
    font-size: 40px;
    margin-bottom: 20px;
}

.input-block {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: solid lightgray 2px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.input {
    width: 100%;
    font-size: 20px;
    padding: 10px 0 10px 10px;
    border: solid black 2px;
    border-radius: 5px;
}

.buttons {
    display: flex;
    justify-content: space-between;
}

.button {
    width: 150px;
    height: 40px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}

.button:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.button:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}
</style>