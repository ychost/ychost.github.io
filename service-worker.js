/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2016/08/09/repair-windows-UEFI/index.html","c429381ed4fb2f4bd460f637a87a08b3"],["/2016/08/10/changeLog/index.html","eaa9b5a40d0a30216d100262c29e201d"],["/2016/08/10/cniots-rostering/index.html","37cf29352ebc8de582a572b7150a94c7"],["/2016/08/10/create-blog-with-jekyll/index.html","6fe9ac6b55b757e2bf60930b91f1e4a1"],["/2016/08/10/fixed-ip-in-vmware-linux/index.html","460311df34a714b628727a8acd770b5c"],["/2016/08/11/show-all-files-in-visualStudio/index.html","3390b1e8bd669817edb76ace8469c107"],["/2016/08/13/use-cnzz-show-pv/index.html","8ea48526b4689bf5418443f557270202"],["/2016/08/14/Sublime-snippets/index.html","421355a1b9d884bb15b39ddb3f8f8076"],["/2016/08/28/github-consistent-with-coding/index.html","9d3dc3cf0ef5e5fb0aa1333ea3609769"],["/2016/08/28/hybird-dispatcher-for-c51/index.html","1539d15bda9c6c4f8e52859c31945543"],["/2016/08/28/transfer-function-with-json/index.html","f8c93616244709d357f0894d49d96f48"],["/2016/09/05/draw-flowchart-in-markdown/index.html","f2855e85569c8114516f5116fd4e14ab"],["/2016/09/05/timetable-2016-2017-01/index.html","4a1a2cfcd4a98a5f49a85e58f17507f1"],["/2017/04/09/linux-recommended-software/index.html","6e3610b733b151a3d631d598ef82a183"],["/2017/04/11/install-ubuntu-on-tablet/index.html","15473feea4a385ad52f093d1f03ca21b"],["/2017/05/15/docker-usefull-cmd/index.html","d35b2ed4348ce20d4acd2f4576ad930e"],["/2017/05/18/spring-cloud-1/index.html","adc4eea96620657731b68accbf0c856a"],["/2017/05/18/spring-cloud-2/index.html","5f0c2e1366259e30451b461d9090b843"],["/2017/05/18/spring-cloud-3/index.html","936b64969176ada3b56120393be9372b"],["/2017/05/18/spring-cloud-4/index.html","287183f667e0334b38a12f86a5973dc3"],["/2017/05/18/spring-cloud-5/index.html","f3d1970cd0fdf8d1cd8492224d0c474b"],["/2017/08/09/leetcode-1/index.html","aba98b7e62ddf865a38d5c11db538aef"],["/2017/08/10/leetcode-2/index.html","fad60aade573ed1df0393c50e70f96bf"],["/2017/08/14/leetcode-array-1/index.html","25717ea840b47474e0e11c9622c8b3d5"],["/2017/08/15/leetcode-array-2/index.html","5d1665ab66d9c92f5563f4649d3f640f"],["/2017/10/10/code-art-c1/index.html","a695e2c1880b620b078ebb4f69510acf"],["/2017/10/11/code-art-c2-1/index.html","f54428268e646d101211b0fae7926dab"],["/2017/10/11/code-art-c2-2/index.html","fc7338dd9b78de0c05391d5b6df260c9"],["/2017/10/19/algorithm-dfs/index.html","5c841dbff9be433b6e579153b0b7fbe4"],["/2018/01/11/java-hashmap/index.html","5c7ddd778419084c26506e8634e827b9"],["/2018/01/11/java-question/index.html","6ce20d1b725bb0653f5ef4b2c9ca1a1f"],["/2018/01/12/crack-interview-array-string/index.html","eb04633cbc16bd375b335edf001d16c1"],["/2018/01/12/java-linkedhashmap/index.html","f2f9b1918a43885f8c48a5307a130904"],["/2018/01/13/java-collection/index.html","e853e3838951d8e3423d51e58eb94be9"],["/2018/01/13/java-string-buffer-builder/index.html","2c9401760577e030a4a3aba6eed994e0"],["/2018/01/14/crack-interview-linkedlist/index.html","ae211f863ba91b222ea12ed592142fb6"],["/2018/01/15/deepin-into-java/index.html","3cdb2701bf5275085a545bb381705b59"],["/2018/01/16/csharp-java-diff/index.html","198dc0cb70223e5d536a4971950778ff"],["/2018/01/17/java-thread-cas/index.html","b7e2973cb5b18c5913651da49027794b"],["/2018/01/18/carck-interview-stack-queue/index.html","a3e7c6315d5290ce2429ab9bb5c65d63"],["/2018/01/22/crack-interview-tree-graph/index.html","92697833cae8d87c4e89a25d7d32c66a"],["/2018/01/23/chinese-copywriting-guidelines/index.html","98b778edfa0a1c1cad890645eae4ea91"],["/2018/01/23/struct-tree/index.html","f6429e9149245ea23ebfed76532f12e3"],["/2018/01/31/it-guide-stack/index.html","a8bc32feb0704d9af89fe3a6edd062fb"],["/2018/02/11/csharp-weak-event-store/index.html","543044e991d1b5393085fb26402fff53"],["/2018/02/23/it-guide-linked-list/index.html","7e0ac9279f0e0c7b72226d4ece781814"],["/2018/02/26/java-integer-equals/index.html","463f598af8455ee7cdad741fea3920d1"],["/2018/02/27/ramos-brush/index.html","1770e560b462b89232e4f2716761d5ae"],["/2018/02/27/wifi-remote-control/index.html","8fb33fc8bd4a90d4abba1cdbfa75d48c"],["/2018/03/01/c-x86-x64-type-bytes/index.html","74e688a3b8c5b2b683872997e83373f4"],["/2018/03/01/interview-qa/index.html","680c4fceef595077bfe55483915a435a"],["/2018/03/05/trave-bin-tree-not-recursive/index.html","22ab99d4df86d740b192815cc03a2952"],["/2018/03/06/it-guide-tree/index.html","6545ba504ac082b8199ce1fb094d1fac"],["/2018/03/10/prepare-interview/index.html","3db7099df38299633d3e45a4efd329a2"],["/2018/03/12/build-tree-by-travel-result/index.html","9033df581ecd38dedc21c93372d411ee"],["/2018/03/13/alibaba-interview-record/index.html","c7ee425ee29ad6a7302c05b78bafac18"],["/2018/03/14/dp-edit-distance/index.html","3e93dff14f47ff2f8e95afa8ff2f8212"],["/2018/03/14/dp-pyramid/index.html","5fd1341901b63dddb39bb2f1070a25ef"],["/2018/03/15/dp-matrix-access/index.html","a9ecad4f5586318917eb3e4fdafe3828"],["/2018/03/15/knapsack-01/index.html","80846422e87194dd0e0f3eb058b79215"],["/2018/03/15/knapsack-complete/index.html","788b2aa641ed58904d391617dd5b8dc3"],["/2018/03/15/knapsack-multiple/index.html","d4afffd515f8321005b385f4ed14d188"],["/2018/03/16/dp-long-inc-sub-seq/index.html","5016da68375550919f8c492f5fdf71a0"],["/2018/03/17/algorithm-dp/index.html","b60ae98577401915486947f5838464bb"],["/2018/03/17/dp-sub-seq-sum-max/index.html","7e03c3afb1b85ff8251591e9b5ae2196"],["/2018/03/17/int-array-split/index.html","95c06eaee25416a64ca3914cff47d86a"],["/2018/03/20/deep-into-jvm/index.html","d340274ac59e0714e62e68df0d6c9a65"],["/2018/03/20/dp-count-bits/index.html","b352433c136c694216f018d5e2f7915f"],["/2018/03/20/dp-money-make-up/index.html","269687a1ade0cae9a8ff125381b039d9"],["/2018/03/22/interview-mistakes/index.html","f085e71551c800a8d339e2c5d5f00ee9"],["/2018/03/24/min-integral/index.html","9ba8ab1d22a8e98ace29a0f77ba9e1b5"],["/2018/03/25/bfs-course-schedule/index.html","7e86985b2da6bb5e76a2cffc8cc57a3a"],["/2018/03/26/algorithm-bfs/index.html","578766da9629e33725aca5f9284fa7c6"],["/2018/03/26/algorithm-dag/index.html","1d1b83e9b31f34f393e5b61d1671da3f"],["/2018/03/27/bfs-min-height-trees/index.html","f58b95384c16f10e39c4d6bcee69571b"],["/2018/03/28/java-skill/index.html","c18ea0e51f7eae09a276aa1b4c5e651b"],["/2018/03/29/algorithm-heap-sort/index.html","fd403fb6bb8d9df6809752b3994d8c0e"],["/2018/03/29/bfs-word-ladder-II/index.html","123947ceb5e6d0c2c4095be8c29f0c1e"],["/2018/03/30/algorithm-quick-sort/index.html","0bb1ea7d85bcc328c27e3d4a5d40209a"],["/2018/04/02/algorithm-bubble-sort/index.html","b53ebc90d77c4a888c411bcf19c0ed12"],["/2018/04/02/greedy-arange-room/index.html","7ffa2751dbf2ea9831f1cd9372ce0b58"],["/2018/04/03/algorithm-insert-sort/index.html","333a49f0b78bc01096e758a1dab5e6c4"],["/2018/04/04/algorithm-shell-sort/index.html","5c3e4776b8ffbc0af78b825c569608ff"],["/2018/04/05/algorithm-select-sort/index.html","5b2fe37fbee3d3dcf00baf217648da52"],["/2018/04/06/algorithm-merge-sort/index.html","d65226be512e8bcc1ca50c37b8b8e106"],["/2018/04/06/algorithm-summary/index.html","9aa418b5145de1e28ef4d6ec6455a849"],["/2018/04/06/linux-double-network-set/index.html","11c7ebeca5139036e255709e5f91ede9"],["/2018/04/07/algorithm-bucket-sort/index.html","375b04835c6714de916701178054bda0"],["/2018/04/08/algorithm-combination/index.html","0b8702e9fff12b090950312f4f885405"],["/2018/04/12/algorithm-stock/index.html","22daf152caa63414c7f8a336ea9c3405"],["/2018/04/14/algorithm-n-queens/index.html","c622f50fb8a05b23af066962669a7e01"],["/2018/05/25/algorithm-bin-search/index.html","31e919da0b43784a93cd5834bb893fa3"],["/2018/08/04/algorithm-subarray/index.html","8b4c0588e620cb7f652b4fade9cfb9d3"],["/2018/08/21/algorithm-sudoku/index.html","308ba40111fdbb824aacc186c8489fb7"],["/2018/08/22/algorithm-sort-list/index.html","38c555eb5249c4ba371e0fb7aad80c36"],["/2018/08/23/deploy-with-git-hook/index.html","2b22bda3e6fa74dac1f65b752f9aaa50"],["/2018/08/29/algorithm-calculator/index.html","73fc02cee77b743ba4d329e407073097"],["/2018/08/30/jenkins-docker-maven/index.html","bac6a03a711a26cf97843a7a16425fcc"],["/2018/09/05/algorithm-rain/index.html","171e9788f63ddffacd553dbdc25b6dbe"],["/2018/09/07/algorithm-bin-tree/index.html","7313a5e530355477f5cb29d19596a6d0"],["/2018/09/20/algorithm-count-digits/index.html","e5659c1b8d0948bd7b019768ddff38e5"],["/2019/03/27/ml-knn/index.html","5cd24bcfa00dec8addf7408870789357"],["/404.html","1692537df5f155422375041f1c49346b"],["/about/index.html","2e673b4177d23af2261e3863f2f19ee6"],["/archive/index.html","f62676b3d3653b42697420ccded102bd"],["/categories/detail/index.html","ad5daea9826c8e5bf3af9a4d8b0fe13e"],["/categories/index.html","4bb4a8900c798ec8cbc50bd3ad8cf13a"],["/files/autoproxy.pac","f38ff491f04c5b38744c68e2f2b01449"],["/files/wsd/deploy-with-git-hook.wsd","7fdae46e552b9f7912563c22ee09fc14"],["/files/wsd/jenkins-process.wsd","4a9d3fa3f347284702a9002722975f3c"],["/images/post/algorithm/bubble-sort.png","4a1a7cf345a3ad202aa1eb269ef6fc2a"],["/images/post/algorithm/bucket-sort.jpg","fd877427e2a0068c91501e2f8131eebc"],["/images/post/algorithm/dag-false.png","d252539570ac36547c5402ef27c6932c"],["/images/post/algorithm/dag-true.png","b4585b05de2afc4046dc9c1154cb1431"],["/images/post/algorithm/dp-edit-distance.png","fd3372adfe50b160e2f887b5c85cb34d"],["/images/post/algorithm/greddy-arange-room.png","a6c80775dd844643ba1ca6670565e241"],["/images/post/algorithm/heap-bin-tree.png","54d9582a922433eeb32a959a56301fdb"],["/images/post/algorithm/heap-min-top.png","141e8a9ff640eb7988b82b9f047f77bb"],["/images/post/algorithm/heap-shiftdown.png","7ba1f2b1b6e15d640e6d0ce8c928d9bb"],["/images/post/algorithm/heap-shiftup.png","c2ac4639e0a356a258dd4e8f20bd9501"],["/images/post/algorithm/insert-sort.png","70fb0b01a263f2326a2c0479a0f0b974"],["/images/post/algorithm/matrix-histogram.png","0ac021852d4e835a195c304deafa3565"],["/images/post/algorithm/merge-sort.jpg","36d063bbfb121e8a3ffded51f26a8d93"],["/images/post/algorithm/ml-knn-test.jpg","286f6451b150779cff7bb4d866cce5b4"],["/images/post/algorithm/n-queens.jpg","24afdfbb2b65f42118d4602778791950"],["/images/post/algorithm/quick-sort-1.png","3e18e2c96a70de9589613b328d89402c"],["/images/post/algorithm/quick-sort-2.png","908d11e798ae0161cf4dacfe9f0d398b"],["/images/post/algorithm/quick-sort-3.png","b2207fd6a3eb955df514fcc1114dc2b8"],["/images/post/algorithm/quick-sort-4.png","ab51f80b20fce68d8d799deb6c697ce1"],["/images/post/algorithm/rain-trap-1.png","a0b5725179e8d2e8540134afe72860be"],["/images/post/algorithm/rain-trap-2.png","5d8e9125272cb52a8163c198888483bf"],["/images/post/algorithm/rain-trap-3.png","6f8a69c4ae8929cbf3f2a080eb2674bf"],["/images/post/algorithm/rain-trap-4.png","aeef38fee2529949e9c226bb66229ae4"],["/images/post/algorithm/shell-sort-1.png","922ffb9468147350f37d6c88d84a54dd"],["/images/post/algorithm/sudoku-1.png","dd1a08b31f2434bc32bd990cd55a7e51"],["/images/post/algorithm/sudoku-2.png","1200c5aae9f02bd72abbb7e9688306c3"],["/images/post/crack/cnzz-get-code.jpg","138b95e8334f03b9dd6061759b142821"],["/images/post/java/array-heap.png","d2c365b36d90efcbefb59aba3df52b25"],["/images/post/java/classloader.png","dc0c6c8c86602580d9cf3d67acdf9ae3"],["/images/post/java/collection-diff.png","a2caba3a46b3e52daa10ca84a5e148c0"],["/images/post/java/collection-func.png","5acbe61162b82d1e22f4450b7d5c4ecf"],["/images/post/java/collection-impl-func.png","98483a748c317d9d301d61172d7c7e5e"],["/images/post/java/collection-impl.gif","9880d75c8d57964e3e91fb7d216bc7cd"],["/images/post/java/collection-struct.png","45889129a856f03bf4a2b8c5d9bb8681"],["/images/post/java/const-pool.jpg","eedf85322f8aefa5bd2e8bfd8895999d"],["/images/post/java/for-heap.png","da9a71beeb33c8d9dac92c96bc4dd87b"],["/images/post/java/hashmap-code.png","4acf898694b8fb53498542dc0c5f765a"],["/images/post/java/hashmap-refresh.png","da2df9ad67181daa328bb09515c1e1c8"],["/images/post/java/hashmap-resize-16-32.png","10d36fdd4a1165bc6f75491f89cc3743"],["/images/post/java/hashmap-resize.png","8d3f779ad8dfcd685a538bbeb0b24cfe"],["/images/post/java/hashmap-struct.png","f3e5f990f5d68e3b6f4753a2cce7e1e9"],["/images/post/java/iterator-uml-detail.png","9880d75c8d57964e3e91fb7d216bc7cd"],["/images/post/java/iterator-uml.png","45889129a856f03bf4a2b8c5d9bb8681"],["/images/post/java/jmm-struct.png","e2c65859bed7dbc96749915b029ba3f9"],["/images/post/java/jvm-compile-process.png","df7fd40aa773c6d3a62ec1f08cc823b1"],["/images/post/java/jvm-gc-copying.jpg","67dc710ec041a9b83949ea068000a55b"],["/images/post/java/jvm-gc-mark-compact.jpg","dbe4acc646b8383a307fa50c842b9a41"],["/images/post/java/jvm-gc-mark-swap.png","29eee2766457155d4c29cf60c359e42f"],["/images/post/java/jvm-java-version.png","0ed9ac438d9dd63e20757557a1c8a5e4"],["/images/post/java/jvm-javac-process.png","4a9f4c3ca832a127df4841f2a947bf17"],["/images/post/java/jvm-jit-for-process.png","b3183d1671456dbdd7d391ac1ac890b5"],["/images/post/java/jvm-jit-process.png","608713ad19eadbf7abc5fe06387c98d0"],["/images/post/java/jvm-stack-frame.png","8d9cc7e11a001db7d4e73cf6e1f99427"],["/images/post/java/jvm-thread-status.png","20419efbf873ab71a90e3c575d9a5133"],["/images/post/java/linkedhashmap-struct.png","168fb7335dd7b37c92cce97443538460"],["/images/post/java/loop-linked-list-intersect-in-loop.png","29d3d4d19c6e9f4994f4ecc9993dc631"],["/images/post/java/loop-linked-list-intersect.png","6dadd4dda1a5e8289635a2e6c8377acc"],["/images/post/java/main-load-step.png","b234a42cd686a16a9424b406dd1e0931"],["/images/post/java/map-func.png","1a86e430be30d7d9234fabeb4a7c2454"],["/images/post/java/method-area.png","70d55dc91b61e70ef4465a26a3efabe9"],["/images/post/java/native-method-stack.png","1ceecd94e75d9b60d440c42906423c66"],["/images/post/java/noloop-linked-list-intersect.png","6f293d5e33dff93f0f402dfa10cc9677"],["/images/post/java/stack-method.png","b135585945ef708d2944528d9a4b4f41"],["/images/post/java/stack-ref-heap.png","25692e208dac15a12202dbf959ab2432"],["/images/post/java/string-heap-change.png","229a2be706f213d80d035ba58dc0e62a"],["/images/post/java/string-heap.png","40efc39061651b7bdd8982578783da6b"],["/images/post/json/josn-with-function.jpg","6668bd621fed83da922a930f82c423be"],["/images/post/linux/albert.png","53be675bd99ab598bf6f5892bb89bcfa"],["/images/post/linux/cliplt.png","8f537742868d0b87655b11a1f2a4b062"],["/images/post/linux/dbeaver.png","c66477ce429bddad5aeed39dd2ce0900"],["/images/post/linux/filezilla.png","12253f448272c994d079770c37b40b15"],["/images/post/linux/idea-main.png","78f436d4e504b7908b75854587f1438f"],["/images/post/linux/idea-start.png","1c5d9557a69a654190ac846d7a5c0e12"],["/images/post/linux/irssi.png","9b3b921a8f180e826d64bc15345880b8"],["/images/post/linux/kodi.png","73be23d88531aedb6489314d14078f66"],["/images/post/linux/linuxium-page.pong.png","4a72300359cb3dc17819d69ed101075d"],["/images/post/linux/mpv.png","3d203113a4fe9b077810da9e4e6065ae"],["/images/post/linux/nylas.png","75d6ba7d153f71c3a1066e35c7b3817b"],["/images/post/linux/officeonline-new-file.png","b264a32276c381ec57cb12c0910911fa"],["/images/post/linux/officeonline-word.png","d94e7c2ecade6ef6e035b4c17d3d6821"],["/images/post/linux/qipmsg.png","0631433833d6fc7da053a2c7b8cb6988"],["/images/post/linux/redis-desktop-manager.png","5c093c412b29a56b6645a6de0110de14"],["/images/post/linux/redshift.png","016d62c5e8acd3a8880f714232d45422"],["/images/post/linux/typroa.png","5c51a8d2a962d145d22c77ae65ef75c1"],["/images/post/linux/vscode.png","4cf8163231b3355acb222eda0f58c3a3"],["/images/post/linux/wangyi-download.png","9508ba916c373ee56ed7ab7a434626e7"],["/images/post/linux/wire-download.png","d15b7fa93a2e1394ec6cb87a7a3d0063"],["/images/post/linux/wire-software.png","d85c5e10fac6273b406aa94f64b32357"],["/images/post/personal/qrcode-weixin.jpg","0a9a7c776879f330f1f6004a9d509c55"],["/images/post/spring/spring-eureka-2.png","4588a5f9fe9e1d450a27a7db30b99f64"],["/images/post/spring/spring-eureka-3.png","d00def2337c69a92bfbf6f1bbe96edf5"],["/images/post/spring/spring-eureka-4.png","c51ee52853264c5eabb735166994c694"],["/images/post/spring/spring-eureka.png","867bc41b3f6ebdb9a926e13aa6efd7a6"],["/images/post/spring/spring-filter.png","54b9676f6def6bf4034dee8a84b2bc01"],["/images/post/spring/spring-ioc-bean-load-flow.jpg","7776f7fe0c2e1af428446710f0b79e23"],["/images/post/spring/spring-structure.png","12debc957a1c2f5efa766ecdd9d0c225"],["/images/post/tablet/bios-boot.png","f12e1fe243ead73871d80927932dbe6c"],["/images/post/tablet/bios-security.png","4564cee674929ed4151d91fccc219a3e"],["/images/post/tablet/ubuntu-install.png","e2cfe52f11e13eb8469e82b3b56fe9be"],["/images/post/tablet/ubuntu-preview-2.png","33f7a6fbf48433b53d392a3e93b0fead"],["/images/post/tablet/ubuntu-preview.png","48041e0b30823220f55aa2d0a3ac2a25"],["/images/post/tutorial/Thumbs.db","a766fd10d8a02ee8cf29a4e48953445b"],["/images/post/tutorial/blog-browse-effect.jpg","c7b535661daefc2a45f6b4f6a8baad1b"],["/images/post/tutorial/blog-start-cmd.jpg","73dd4983e6dcb0a613938326722daba6"],["/images/post/tutorial/cmd-open-infolder.jpg","1f42e803f9c6dce4001f22330d957fcc"],["/images/post/tutorial/deepin-proxy-setting.png","62676981e1663878863d8d8659b8a840"],["/images/post/tutorial/devkit-download-page.jpg","8075685f3083cc8b1d80d3c74b9154d4"],["/images/post/tutorial/devkit-unzip-process.jpg","509fb9b86042c87809120de71a521c64"],["/images/post/tutorial/git-input-cmd.jpg","009b0867a4460b98b2319e1f19d3df26"],["/images/post/tutorial/git-install-process.jpg","815bbe0f48b0485c7b208a3e6bd71d3d"],["/images/post/tutorial/github-add-webhooks.jpg","918a0199ba57ad32e1e77fe499cdbf4a"],["/images/post/tutorial/github-coding-flow.jpg","6669077e89dffd30d4ad31bb99985fbd"],["/images/post/tutorial/github-create-acnt.jpg","b8b0b4abe240be3b136be6643e8de394"],["/images/post/tutorial/github-create-repo.jpg","f112669ee1adb4fd01e01346f239cfc8"],["/images/post/tutorial/github-submit-repo.jpg","b5dca2a83b616c72cc1e1590f1228ef0"],["/images/post/tutorial/google.com.png","5bdf04b135b8c1dd93221fe9f0f58a34"],["/images/post/tutorial/hook-deploy.png","6b06763a4c106f2c551c777e78182486"],["/images/post/tutorial/hx-account-info.png","c6b0c4c52186cb729951be38f98f1c2a"],["/images/post/tutorial/hx-add-shopping-car.png","551daadcfe9a9b2e9435350ce9c1e39c"],["/images/post/tutorial/hx-checkout.png","f53c84a96307f10fdbfd7e077b6da72f"],["/images/post/tutorial/hx-home-page.png","61ea1915b9946e1ccadef33e56b42ac7"],["/images/post/tutorial/hx-pay-off.png","362ffba6eb2f143c2290548d6b1b25cf"],["/images/post/tutorial/hx-qr-code.png","33baec5398eef2af2c8f0904dcddf6f4"],["/images/post/tutorial/hx-register.png","27ddc07dd8b021efb35e539f9df81435"],["/images/post/tutorial/hx-subscribe-page.png","9afe911c0c02b85ad1bdfe1b7fb0a9c5"],["/images/post/tutorial/jekyll-download-theme.jpg","31762b46da9ba4b8f120639a16ee0637"],["/images/post/tutorial/jekyll-install-cmd.jpg","5e694ba6858e946d50a19e14e3a358d1"],["/images/post/tutorial/jekyll-install-rst.jpg","949bddd0a77950225ac271a7b79765ea"],["/images/post/tutorial/jenkins-1.png","f92a0f8587a948993a7556d95e24573e"],["/images/post/tutorial/jenkins-10.png","09e15b7e911f53dd6b9e70bbada5f93f"],["/images/post/tutorial/jenkins-11.png","ff1d8dd8a4d66fce12b429096308aa26"],["/images/post/tutorial/jenkins-12.png","e32edcb2ae4a9e8fce5fcd5c2b8ca362"],["/images/post/tutorial/jenkins-2.png","121d8ff64c9efeb736d259204ae6e6e5"],["/images/post/tutorial/jenkins-3.png","a8058bdaef567c28e7698f82f24b2d15"],["/images/post/tutorial/jenkins-4.png","86333ddabf8e9b7b4b4b8c679dd8d04f"],["/images/post/tutorial/jenkins-5.png","e2d2b4d82120467d01c62d0528c0dd8a"],["/images/post/tutorial/jenkins-6.png","d49fe067a5e49ed1597f5bc4295212d9"],["/images/post/tutorial/jenkins-7.png","b1b675232d906600f4f5e1009e23b2db"],["/images/post/tutorial/jenkins-8.png","53b08f4082e5a9667062fb540312986c"],["/images/post/tutorial/jenkins-9.png","32fe4272634a4cab6be3272436ad3151"],["/images/post/tutorial/jenkins-process.png","58222cc2645c52c876558772b250c885"],["/images/post/tutorial/open-openshift-web-console.jpg","ebd73a3b331aa70ecc08919193bac510"],["/images/post/tutorial/openshift-add-phpapp.jpg","9266629731796f84d1b2f1718df98329"],["/images/post/tutorial/pkg-install-info.jpg","4785cdffc11177b7b64e9fccc57a0617"],["/images/post/tutorial/rch-login-successfully.jpg","1c0b13d26ecc1121e11799b3bbb3ac18"],["/images/post/tutorial/ruby-download-page.jpg","2b6b3ef35123a475c6c31553947c6126"],["/images/post/tutorial/ruby-install-step.jpg","4f53df6c963a7e1f4a9fb57e63f02cc4"],["/images/post/tutorial/ss-config.png","c04864ec27db47682e78436017425340"],["/images/post/tutorial/ssqt5-client-gui.png","65c3de6ff57ac28c4a4b3b03e06026e6"],["/images/post/tutorial/terminal-http-proxy.png","8d03b244a505dfbcdd349b0ecb36718a"],["/images/post/tutorial/vim-privoxy-config.png","edf2fcfc35445d89b7e086ca28e8b814"],["/images/post/vmware/Thumbs.db","17f5075e4560dfbd32f9d49f5fddc4c6"],["/images/post/vmware/centos-ping-network.png","fef422fe8e891b7a8470fafb3bfe3d84"],["/images/post/vmware/centos-set-ip.png","b8ad8091216ebf74ae3ff1ecc6143936"],["/images/post/vmware/host-fixed-ip.png","4cdc106445c8dfcc1220b28cad9151fe"],["/images/post/vmware/host-ping-centos.png","3bc7f6cf959a703b461df8b073dfe6c8"],["/images/post/vmware/host-share-wlan.png","96d24b5d889d1e6b62181dd548138712"],["/images/post/vmware/vmware-config-network.png","8290ae2af9232845d85a98af1e810882"],["/images/post/windows/Thumbs.db","ad11731bd0aa7f691fd9940894ebf470"],["/images/post/windows/bootice-bcd-config.png","e5ee3354a21582f2ab545ab98cd92e57"],["/images/post/windows/bootice-config.png","cea4bf212c489f8f1dd803a883d4c7c7"],["/images/post/windows/rufus.png","2dc6377ae01d7afebc3bead26ba5eca2"],["/images/post/windows/vs-copy-folder.jpg","f4686f7667afe59ae7f6b7f287abc85b"],["/images/post/windows/vs-include-files.jpg","8d4ad7cc4f02a17886fd50092f604776"],["/index.html","d0af396c0b08a34314c334fdda16de66"],["/page10/index.html","8557a8ee53dd702ede2a0fc61c2cdf8f"],["/page11/index.html","ac32a892fc17b83dd3bbc159ce56a668"],["/page12/index.html","958dd8165c98563d249f10b18788a76a"],["/page13/index.html","fa31583525c752e7bfc75f0ac7e70cc7"],["/page2/index.html","420c48102203d7e21ba35659f304ce2b"],["/page3/index.html","162e0e040676d21b104a42f4a3bb2f26"],["/page4/index.html","cc2f4210f1a93dccce49c24003338e4b"],["/page5/index.html","acc6f47292ea4f3ae11501e2c30290ee"],["/page6/index.html","9b16b14974ae9c73a8c7331f86bf4850"],["/page7/index.html","083fbaa8087c2c7ecddf73717226a51d"],["/page8/index.html","f77c68838ba423236b076ebeee377fe4"],["/page9/index.html","dc8e6adf90bc4cf4e930cd8e640438b0"],["/tags/index.html","59390530c99635e06b30e4327e0dade8"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







