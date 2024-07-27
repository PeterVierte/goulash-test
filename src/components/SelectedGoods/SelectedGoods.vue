<template>
  <div class="selected-goods-root">
    <div v-if="successOrderNumber">{{`Номер вашего заказа: ${successOrderNumber}`}}</div>
    <div v-else-if="!selectedProducts.length">Ничего не выбрано</div>
    <div v-else>
      <div class="selected-goods">
        <div class="table-item header">
          <div class="table-cell">Название товара</div>
          <div class="table-cell">Количество</div>
          <div class="table-cell">Стоимость</div>
        </div>

        <div class="selected-items">
          <div :key="selectedProduct.id" v-for="selectedProduct in selectedProducts" class="table-item">
            <div class="table-cell">{{ selectedProduct.title }}</div>
            <div class="table-cell">{{ selectedProduct.count }} шт</div>
            <div class="table-cell">{{ selectedProduct.count * selectedProduct.price }} ₽</div>
          </div>
        </div>
      </div>
      <div class="total">Итого: {{ total }}</div>
      <div class="btn-wrapper">
        <button @click="saveProduct" class="save-btn">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {SelectedProduct} from '@/components/Goods/Goods.vue';
import {computed} from "vue";

const props = defineProps<{
  selectedProducts: SelectedProduct[],
  successOrderNumber: number | null
}>()

const emits = defineEmits<{
  onSaveOrder: []
}>()


const saveProduct = () => {
  emits('onSaveOrder');
}

const total = computed(() => {
  return props.selectedProducts.reduce((acc, product) => acc + product.count * product.price, 0)
})
</script>

<style scoped lang="scss">
.selected-goods-root {
  flex: 1;
}

.selected-goods {

  padding-top: 50px;
  padding-bottom: 20px;
  max-height: 420px;
  min-height: 420px;
  height: 100%;
  overflow-y: auto;
  border-bottom: var(--btn-blue) 1px solid;
}

.table-item {
  display: flex;
  gap: 50px;

  &.header {
    & > div {
      color: var(--blue);
      margin-bottom: 30px;
    }
  }

  & > div:nth-child(1) {
    width: 60%;
    text-align: left;
  }

  & > div:nth-child(2), & > div:nth-child(3) {
    width: 20%;
    text-align: left;
  }
}

.selected-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.total {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
  margin-bottom: 25px;
}

.save-btn {
  background: var(--green);
  border: var(--green);
  padding: 12px 0;
  cursor: pointer;
  border-radius: 4px;
  color: var(--white);
  max-width: 394px;
  width: 100%;
  font-size: 24px;
  font-weight: 400;
  transition: background .2s linear;

  &:hover {
    background: lighten(#61a91a, 10%);
  }
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}

@media (max-width: 640px) {
  .header {
    display: none;
  }

  .selected-goods {
    padding-top: 0;
    min-height: unset;
  }


  .table-item {
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    & > div:nth-child(1) {
      width: 100%;
    }

    & > div:nth-child(2), & > div:nth-child(3) {
      font-weight: 600;
      flex: 1;
    }

    & > div:nth-child(3) {
      text-align: end;
    }
  }
}
</style>