<template>
    <div>
        DialogArticle
        <!-- <preview-dialog-article-item v-if="card" :item="item"></preview-dialog-article-item>
        <preview-dialog-article-view v-else :item="item"></preview-dialog-article-view> -->
    </div>
</template>

<script>
import PreviewDialogArticleItem from '@/components/PreviewDialogArticleItem';
import PreviewDialogArticleView from '@/components/PreviewDialogArticleView';

export default {
    components: {
        PreviewDialogArticleItem,
        PreviewDialogArticleView
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