<template>
  <div class="goods-selection">
    <div class="selection-item">
      <label>Выберите продукцию</label>
      <select v-model="productSelection.product">
        <option :key="product.id" v-for="product in products" :value="product.id">{{product.title}}</option>
      </select>
    </div>

    <div class="selection-item">
      <label>Введите количество</label>
      <input v-model="productSelection.count" type="number">
    </div>

    <button @click="onAddProduct" class="submit-btn">Добавить</button>
  </div>
</template>

<script setup lang="ts">
import type {Product} from "@/types/Product";
import {reactive} from "vue";
import type {SelectedProduct} from '@/components/Goods/Goods.vue'

const props = defineProps<{
  products: Product[]
}>()

const emits = defineEmits<{
  onAddProduct: [product: SelectedProduct]
}>()

const productSelection = reactive({
  product: props.products[0].id,
  count: 0
})

const onAddProduct = () => {
  if(productSelection.count === 0) return;

  const searchProduct = props.products.find(product => product.id === productSelection.product);
  if(searchProduct) {
    emits('onAddProduct', {...searchProduct, count: productSelection.count});
    productSelection.product = props.products[0].id;
    productSelection.count = 0;
  }
}

</script>

<style scoped lang="scss">
.goods-selection {
  max-width: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 37px;
}

.selection-item {
  & > label {
    display: block;
    margin-bottom: 20px;
  }

  & > select, & > input {
    width: 100%;
    color: var(--blue);
    font-size: 24px;
    font-weight: 300;
    font-family: var(--font-family);
    padding: 11px 16px;
    border-bottom: var(--blue) 1px solid;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background: var(--light-blue);
  }
}

.submit-btn {
  width: 100%;
  background: var(--btn-blue);
  padding: 12px;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  transition: background .2s linear;

  &:hover {
    background: lighten(#2fa6ea, 10%);
  }
}
@media (max-width: 960px) {
  .goods-selection {
    max-width: 100%;
  }

}

</style>