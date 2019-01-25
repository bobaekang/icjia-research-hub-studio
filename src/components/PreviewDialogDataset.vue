<template>
    <div>
        DialogDataset
        <!-- <preview-dialog-dataset-item v-if="card" :item="item"></preview-dialog-dataset-item>
        <preview-dialog-dataset-detail v-else :item="item"></preview-dialog-dataset-detail> -->
    </div>
</template>

<script>
import PreviewDialogDatasetItem from '@/components/PreviewDialogDatasetItem';
import PreviewDialogDatasetDetail from '@/components/PreviewDialogDatasetDetail';

export default {
    components: {
        PreviewDialogDatasetItem,
        PreviewDialogDatasetDetail,
    },
    props: {
        item: Object,
    },
    data () {
        return {
            card: true,
        }
    }
}
</script>