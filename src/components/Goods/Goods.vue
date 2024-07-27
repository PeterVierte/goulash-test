<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="goods">
    <div class="container">
      <div class="goods-inner">
        <GoodsSelection :products="products" @on-add-product="onAddSelectedProduct"/>
        <SelectedGoods :selectedProducts="selectedProducts" @on-save-order="onSaveOrder" :successOrderNumber="successOrderNumber"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectedGoods from "@/components/SelectedGoods/SelectedGoods.vue";
import GoodsSelection from "@/components/GoodsSelection/GoodsSelection.vue";
import {$axios} from "@/configs/http";
import {onMounted, ref} from "vue";
import type {Product} from "@/types/Product";

export type SelectedProduct = Product & {
  count: number
}

const products = ref<Product[]>([]);
const isLoading = ref(true);
const selectedProducts = ref<SelectedProduct[]>([]);
const successOrderNumber = ref<number | null>(null);

const getProducts = async () => {
  try {
    const {data} = await $axios.get<{products: Product[]}>('/products.php');
    products.value = data.products;
  }catch (e) {
    console.log(e)
  }finally {
    isLoading.value = false;
  }
}

const onSaveOrder = async () => {
  try {
    const postData = {
      products: selectedProducts.value.map(item => {
        return {
          product_id: item.id,
          quantity: item.count
        }
      })
    }
    const {data} = await $axios.post<{code: number, success: boolean}>('/save.php', postData)
    if(data.success) {
      selectedProducts.value = [];
      successOrderNumber.value = data.code;

      setTimeout(() => {
        successOrderNumber.value = null;
      }, 3000)
    }
  }catch (e) {
    console.log(e);
  }
}

const onAddSelectedProduct = (product: SelectedProduct) => {
  const isInCartIdx = selectedProducts.value.findIndex(selectedProduct => selectedProduct.id === product.id);
  if(isInCartIdx !== -1) {
    selectedProducts.value[isInCartIdx].count = product.count;
  }else {
    selectedProducts.value.push(product);
  }

  console.log(selectedProducts.value)

}


onMounted(() => {
  getProducts();
})
</script>

<style scoped>
.goods {
  padding-top: 40px;
  padding-bottom: 60px;
}
.goods-inner {
  display: flex;
  gap: 50px;
}

@media (max-width: 960px) {
  .goods-inner {
    flex-direction: column;
  }
  
}
</style>