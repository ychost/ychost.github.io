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

var precacheConfig = [["/2016/08/09/repair-windows-UEFI/index.html","ec9345c3f87b512b2aaee79f9814094f"],["/2016/08/10/changeLog/index.html","b1e35d72a75e356eedb86d58f79dac53"],["/2016/08/10/cniots-rostering/index.html","fe0d69e70dccac5d28ad20935e5af15e"],["/2016/08/10/create-blog-with-jekyll/index.html","d02fbd6bdebb7f7a4cdff179b505eef0"],["/2016/08/10/fixed-ip-in-vmware-linux/index.html","fee5b2d0b89d5239829595d28849d550"],["/2016/08/11/show-all-files-in-visualStudio/index.html","6248a38a7d1ae6ca067f4033d93292a1"],["/2016/08/13/use-cnzz-show-pv/index.html","6b0b835f07d6de0e076b8ea9aa72964a"],["/2016/08/14/Sublime-snippets/index.html","377505d1ddf7831b65ced9998a60d945"],["/2016/08/28/github-consistent-with-coding/index.html","89ea969e893386d4969bd84101e40bbc"],["/2016/08/28/hybird-dispatcher-for-c51/index.html","5c877bbcaf84461b318e55c346eb0fc6"],["/2016/08/28/transfer-function-with-json/index.html","1601d01fe5e639d40c5ceabc56ab6132"],["/2016/09/05/draw-flowchart-in-markdown/index.html","9e0f8a496d48272fa37e8392718c1dfe"],["/2016/09/05/timetable-2016-2017-01/index.html","4120a9b0eb0d0808cbd55370e3beee8a"],["/2017/04/08/proxy-on-linux-final/index.html","139d234bdbf8d839110caea47456a8fd"],["/2017/04/09/linux-recommended-software/index.html","fa2edda50eab429e34d60d96a37bfb3a"],["/2017/04/11/install-ubuntu-on-tablet/index.html","da6dd5ba3ebf64a06cbb44a2630fed79"],["/2017/05/15/docker-usefull-cmd/index.html","5494ef72c32f590fbec5195a4d0ae325"],["/2017/05/18/spring-cloud-1/index.html","176cc623c13eac1ace1f1680c6c3b3b9"],["/2017/05/18/spring-cloud-2/index.html","560afef33b7a742bf0f42464da94b21e"],["/2017/05/18/spring-cloud-3/index.html","b9c8ebd1bb8227ba1590da874851b328"],["/2017/05/18/spring-cloud-4/index.html","04ed32da3140df9ffbc76447d191146f"],["/2017/05/18/spring-cloud-5/index.html","740bc244911bea472906b5c04dde9deb"],["/2017/08/09/leetcode-1/index.html","52097f7e18408ea3cd8fcbc5af3dd14d"],["/2017/08/10/leetcode-2/index.html","05e454e525d1a7c62918833bbfc2cd47"],["/2017/08/14/leetcode-array-1/index.html","0ff257c95fd9677468f894cc6bc5a8c6"],["/2017/08/15/leetcode-array-2/index.html","9a12a94f55bdb32e376f51c021f643a9"],["/2017/10/10/code-art-c1/index.html","76fc333dda933e1c6b2effc112655e75"],["/2017/10/11/code-art-c2-1/index.html","4756275727a086dce918593af994325c"],["/2017/10/11/code-art-c2-2/index.html","8ee8b9e627d052e4e9fa5ddf2e5047a0"],["/2017/10/19/algorithm-dfs/index.html","6e6f08d913792861ab052b462e214206"],["/2018/01/11/java-hashmap/index.html","4d2c9cc193b64f6ccec60989a638606f"],["/2018/01/11/java-question/index.html","a795123cb7d2af7cab87b4336be1a808"],["/2018/01/12/crack-interview-array-string/index.html","ecf29c34962755cb7068ef5eec437b8f"],["/2018/01/12/java-linkedhashmap/index.html","6c26c7f3cc0cc30c0b8b7f9b70e1a0c5"],["/2018/01/13/java-collection/index.html","66ab742bff9eb9c213d3c7609c7af907"],["/2018/01/13/java-string-buffer-builder/index.html","07bbbc4361591e4d464d09cee218a098"],["/2018/01/14/crack-interview-linkedlist/index.html","175bccfce06ecf8c67e55f8d58d2f581"],["/2018/01/15/deepin-into-java/index.html","349c69dc2a426cb371152a173fc9b6be"],["/2018/01/16/csharp-java-diff/index.html","2be58f8a2e42945c72f0830ec7bf7395"],["/2018/01/17/java-thread-cas/index.html","26a9696e8bde9d5afb8abf1b05f1166e"],["/2018/01/18/carck-interview-stack-queue/index.html","59a5e1550d11bc60afad17fa2971d3ea"],["/2018/01/22/crack-interview-tree-graph/index.html","ec43993e88cfcb05c9bdc03fd5847ac5"],["/2018/01/23/chinese-copywriting-guidelines/index.html","13946b547791bb126dfc7ffe0ba7e4f5"],["/2018/01/23/struct-tree/index.html","e245320333d5914c031fcb875613b95d"],["/2018/01/31/it-guide-stack/index.html","1086cb435b8cb991ddc09a69c6ff1fac"],["/2018/02/11/csharp-weak-event-store/index.html","fed25b8fda8bae245d51ca0c2f245042"],["/2018/02/23/it-guide-linked-list/index.html","d1e107e0c6d32b7bc64b267fc3dfdb10"],["/2018/02/26/java-integer-equals/index.html","7935f9ff24da62b156058a24149ca9a3"],["/2018/02/27/ramos-brush/index.html","74c4d9dd755df0b89798a16857693145"],["/2018/02/27/wifi-remote-control/index.html","9b7d3eaceff74c6412aa3155d1af327f"],["/2018/03/01/c-x86-x64-type-bytes/index.html","b8bda2257806a605d7b76b02627159cb"],["/2018/03/01/interview-qa/index.html","eae4b368d4f7422b2098cbca965ae94e"],["/2018/03/05/trave-bin-tree-not-recursive/index.html","6a6968c6c96bf63d0dab06739bf8e219"],["/2018/03/06/it-guide-tree/index.html","3812ff0ddb97b2e84c10ea8d6d22e78e"],["/2018/03/10/prepare-interview/index.html","48471449176108c23b6f9001061c741f"],["/2018/03/12/build-tree-by-travel-result/index.html","d3c497119d46188d3f74b08808509458"],["/2018/03/13/alibaba-interview-record/index.html","e543ac1dff05402e5a6d65ef059e9d28"],["/2018/03/14/dp-edit-distance/index.html","50cf00411e2f8fc6a6583a3c8f6c8f7b"],["/2018/03/14/dp-pyramid/index.html","267805309e2f2735459002f5be00f851"],["/2018/03/15/dp-matrix-access/index.html","6b5ab33aa4fa7cfb7411fc2f643d8c1d"],["/2018/03/15/knapsack-01/index.html","1a8cbefcb24fbea83a8488d20431eafe"],["/2018/03/15/knapsack-complete/index.html","9d5cd371cdefe2cca421b4cf169c2fea"],["/2018/03/15/knapsack-multiple/index.html","cc5be9380270454baa1d218a41a66cb1"],["/2018/03/16/dp-long-inc-sub-seq/index.html","977d1edee15638a7b626a4ecaaccbb65"],["/2018/03/17/algorithm-dp/index.html","f7d5ea22f413540ed22b6449f6c7a01f"],["/2018/03/17/dp-sub-seq-sum-max/index.html","e42f3dd4d44ba856fe827e6f3bcd8ec8"],["/2018/03/17/int-array-split/index.html","21d171b255477100dcfc0b731b3d59b4"],["/2018/03/20/deep-into-jvm/index.html","4a1433db4572870962ce0e74982456e5"],["/2018/03/20/dp-count-bits/index.html","e2094ecf3f7e7e322a26f9c96275686e"],["/2018/03/20/dp-money-make-up/index.html","97f3893c0fe6da5d9357fe56976ac9a7"],["/2018/03/22/interview-mistakes/index.html","fd2397c662215d05627690c4f1dc9113"],["/2018/03/24/min-integral/index.html","e489d00bc33ffc2413833f11665e2adb"],["/2018/03/25/bfs-course-schedule/index.html","2ae0604a10f0c80dcc64de88b47cb320"],["/2018/03/26/algorithm-bfs/index.html","67845925afb2c88229a10fd8d1ee5e30"],["/2018/03/26/algorithm-dag/index.html","d2f4e98a6bccb111cd1fc3da9d0126f5"],["/2018/03/27/bfs-min-height-trees/index.html","1ba397213db75db52ce8820a781acf3b"],["/2018/03/28/java-skill/index.html","7d871de6788564ad9bb80a27645a1168"],["/2018/03/29/algorithm-heap-sort/index.html","5e99de93b638d9016a20168a708be2aa"],["/2018/03/29/bfs-word-ladder-II/index.html","d7b48da92cc3b29a7dddd91f87fa84c5"],["/2018/03/30/algorithm-quick-sort/index.html","07feea8ebbb4283dbd828e397bd75e16"],["/2018/04/02/algorithm-bubble-sort/index.html","e6465cdcd6477386c05506cfbde6477c"],["/2018/04/02/greedy-arange-room/index.html","d395f8ab562187912b8fe1bbb99017d0"],["/2018/04/03/algorithm-insert-sort/index.html","613c21859eae5e0bf9bbe017938c2425"],["/2018/04/04/algorithm-shell-sort/index.html","368a388b0150798b18a0b0c17f09305e"],["/2018/04/05/algorithm-select-sort/index.html","64a3b61b878a359b3a957b5a25dd5076"],["/2018/04/06/algorithm-merge-sort/index.html","cd93216b391ef4f5fd77a42bdee71552"],["/2018/04/06/algorithm-summary/index.html","0eaf4638ad2af9fb28ab5cb02b5fa50e"],["/2018/04/06/linux-double-network-set/index.html","236145b391b6378dfd6635cd7fede880"],["/2018/04/07/algorithm-bucket-sort/index.html","b04a5e9e227ba1a1e890fade08e95b78"],["/2018/04/08/algorithm-combination/index.html","30a1aee1ad0404982bf0db104a726418"],["/2018/04/12/algorithm-stock/index.html","d2613b7e1ad4e3857dbc7319bf277e61"],["/2018/04/14/algorithm-n-queens/index.html","86f03ed2ea6688f2330db9fbdd662218"],["/2018/05/25/algorithm-bin-search/index.html","303bca9a980595ff4b090f78e3685d36"],["/2018/08/04/algorithm-subarray/index.html","ddcff4163d57462fa1373ac02af78d0f"],["/2018/08/21/algorithm-sudoku/index.html","484923bd0356743ae80f0fdf78808cfa"],["/2018/08/22/algorithm-sort-list/index.html","c42689c70884f5ef525e8706689c406b"],["/2018/08/23/deploy-with-git-hook/index.html","fbdd7e2aa4cfe4f4647c2329a02a0776"],["/2018/08/29/algorithm-calculator/index.html","d430c63168b8e883b26697f2258ea66d"],["/2018/08/30/jenkins-docker-maven/index.html","9d62dc16e0c2713fab7c7eb924ccb39a"],["/404.html","6ca3b490fb7c7b0370564124c7189a20"],["/about/index.html","33d664b48a7d8bacead5322085341e39"],["/archive/index.html","d1bec19ec424fef1fbee80769f0be974"],["/categories/detail/index.html","9418bc2702116b0deef30696da56da66"],["/categories/index.html","f07d6c348e739743a6a487661bd45a36"],["/files/autoproxy.pac","f38ff491f04c5b38744c68e2f2b01449"],["/files/wsd/deploy-with-git-hook.wsd","7fdae46e552b9f7912563c22ee09fc14"],["/files/wsd/jenkins-process.wsd","4a9d3fa3f347284702a9002722975f3c"],["/images/post/algorithm/bubble-sort.png","4a1a7cf345a3ad202aa1eb269ef6fc2a"],["/images/post/algorithm/bucket-sort.jpg","fd877427e2a0068c91501e2f8131eebc"],["/images/post/algorithm/dag-false.png","d252539570ac36547c5402ef27c6932c"],["/images/post/algorithm/dag-true.png","b4585b05de2afc4046dc9c1154cb1431"],["/images/post/algorithm/dp-edit-distance.png","fd3372adfe50b160e2f887b5c85cb34d"],["/images/post/algorithm/greddy-arange-room.png","a6c80775dd844643ba1ca6670565e241"],["/images/post/algorithm/heap-bin-tree.png","54d9582a922433eeb32a959a56301fdb"],["/images/post/algorithm/heap-min-top.png","141e8a9ff640eb7988b82b9f047f77bb"],["/images/post/algorithm/heap-shiftdown.png","7ba1f2b1b6e15d640e6d0ce8c928d9bb"],["/images/post/algorithm/heap-shiftup.png","c2ac4639e0a356a258dd4e8f20bd9501"],["/images/post/algorithm/insert-sort.png","70fb0b01a263f2326a2c0479a0f0b974"],["/images/post/algorithm/matrix-histogram.png","0ac021852d4e835a195c304deafa3565"],["/images/post/algorithm/merge-sort.jpg","36d063bbfb121e8a3ffded51f26a8d93"],["/images/post/algorithm/n-queens.jpg","24afdfbb2b65f42118d4602778791950"],["/images/post/algorithm/quick-sort-1.png","3e18e2c96a70de9589613b328d89402c"],["/images/post/algorithm/quick-sort-2.png","908d11e798ae0161cf4dacfe9f0d398b"],["/images/post/algorithm/quick-sort-3.png","b2207fd6a3eb955df514fcc1114dc2b8"],["/images/post/algorithm/quick-sort-4.png","ab51f80b20fce68d8d799deb6c697ce1"],["/images/post/algorithm/shell-sort-1.png","c52e08027910d98f78ee1d225cf03a8b"],["/images/post/algorithm/sudoku-1.png","dd1a08b31f2434bc32bd990cd55a7e51"],["/images/post/algorithm/sudoku-2.png","1200c5aae9f02bd72abbb7e9688306c3"],["/images/post/crack/cnzz-get-code.jpg","138b95e8334f03b9dd6061759b142821"],["/images/post/java/array-heap.png","d2c365b36d90efcbefb59aba3df52b25"],["/images/post/java/classloader.png","dc0c6c8c86602580d9cf3d67acdf9ae3"],["/images/post/java/collection-diff.png","a2caba3a46b3e52daa10ca84a5e148c0"],["/images/post/java/collection-func.png","5acbe61162b82d1e22f4450b7d5c4ecf"],["/images/post/java/collection-impl-func.png","98483a748c317d9d301d61172d7c7e5e"],["/images/post/java/collection-impl.gif","9880d75c8d57964e3e91fb7d216bc7cd"],["/images/post/java/collection-struct.png","45889129a856f03bf4a2b8c5d9bb8681"],["/images/post/java/const-pool.jpg","eedf85322f8aefa5bd2e8bfd8895999d"],["/images/post/java/for-heap.png","da9a71beeb33c8d9dac92c96bc4dd87b"],["/images/post/java/hashmap-code.png","4acf898694b8fb53498542dc0c5f765a"],["/images/post/java/hashmap-refresh.png","da2df9ad67181daa328bb09515c1e1c8"],["/images/post/java/hashmap-resize-16-32.png","10d36fdd4a1165bc6f75491f89cc3743"],["/images/post/java/hashmap-resize.png","8d3f779ad8dfcd685a538bbeb0b24cfe"],["/images/post/java/hashmap-struct.png","f3e5f990f5d68e3b6f4753a2cce7e1e9"],["/images/post/java/iterator-uml-detail.png","9880d75c8d57964e3e91fb7d216bc7cd"],["/images/post/java/iterator-uml.png","45889129a856f03bf4a2b8c5d9bb8681"],["/images/post/java/jmm-struct.png","e2c65859bed7dbc96749915b029ba3f9"],["/images/post/java/jvm-compile-process.png","df7fd40aa773c6d3a62ec1f08cc823b1"],["/images/post/java/jvm-gc-copying.jpg","67dc710ec041a9b83949ea068000a55b"],["/images/post/java/jvm-gc-mark-compact.jpg","dbe4acc646b8383a307fa50c842b9a41"],["/images/post/java/jvm-gc-mark-swap.png","29eee2766457155d4c29cf60c359e42f"],["/images/post/java/jvm-java-version.png","0ed9ac438d9dd63e20757557a1c8a5e4"],["/images/post/java/jvm-javac-process.png","4a9f4c3ca832a127df4841f2a947bf17"],["/images/post/java/jvm-jit-for-process.png","b3183d1671456dbdd7d391ac1ac890b5"],["/images/post/java/jvm-jit-process.png","608713ad19eadbf7abc5fe06387c98d0"],["/images/post/java/jvm-stack-frame.png","8d9cc7e11a001db7d4e73cf6e1f99427"],["/images/post/java/jvm-thread-status.png","20419efbf873ab71a90e3c575d9a5133"],["/images/post/java/linkedhashmap-struct.png","168fb7335dd7b37c92cce97443538460"],["/images/post/java/loop-linked-list-intersect-in-loop.png","29d3d4d19c6e9f4994f4ecc9993dc631"],["/images/post/java/loop-linked-list-intersect.png","6dadd4dda1a5e8289635a2e6c8377acc"],["/images/post/java/main-load-step.png","b234a42cd686a16a9424b406dd1e0931"],["/images/post/java/map-func.png","1a86e430be30d7d9234fabeb4a7c2454"],["/images/post/java/method-area.png","70d55dc91b61e70ef4465a26a3efabe9"],["/images/post/java/native-method-stack.png","1ceecd94e75d9b60d440c42906423c66"],["/images/post/java/noloop-linked-list-intersect.png","6f293d5e33dff93f0f402dfa10cc9677"],["/images/post/java/stack-method.png","b135585945ef708d2944528d9a4b4f41"],["/images/post/java/stack-ref-heap.png","25692e208dac15a12202dbf959ab2432"],["/images/post/java/string-heap-change.png","229a2be706f213d80d035ba58dc0e62a"],["/images/post/java/string-heap.png","40efc39061651b7bdd8982578783da6b"],["/images/post/json/josn-with-function.jpg","6668bd621fed83da922a930f82c423be"],["/images/post/linux/albert.png","53be675bd99ab598bf6f5892bb89bcfa"],["/images/post/linux/cliplt.png","8f537742868d0b87655b11a1f2a4b062"],["/images/post/linux/dbeaver.png","c66477ce429bddad5aeed39dd2ce0900"],["/images/post/linux/filezilla.png","12253f448272c994d079770c37b40b15"],["/images/post/linux/idea-main.png","78f436d4e504b7908b75854587f1438f"],["/images/post/linux/idea-start.png","1c5d9557a69a654190ac846d7a5c0e12"],["/images/post/linux/irssi.png","9b3b921a8f180e826d64bc15345880b8"],["/images/post/linux/kodi.png","f40be28d619f0d335190e7dbe41c121c"],["/images/post/linux/linuxium-page.pong.png","4a72300359cb3dc17819d69ed101075d"],["/images/post/linux/mpv.png","3d203113a4fe9b077810da9e4e6065ae"],["/images/post/linux/nylas.png","75d6ba7d153f71c3a1066e35c7b3817b"],["/images/post/linux/officeonline-new-file.png","b264a32276c381ec57cb12c0910911fa"],["/images/post/linux/officeonline-word.png","d94e7c2ecade6ef6e035b4c17d3d6821"],["/images/post/linux/qipmsg.png","0631433833d6fc7da053a2c7b8cb6988"],["/images/post/linux/redis-desktop-manager.png","5c093c412b29a56b6645a6de0110de14"],["/images/post/linux/redshift.png","016d62c5e8acd3a8880f714232d45422"],["/images/post/linux/typroa.png","5c51a8d2a962d145d22c77ae65ef75c1"],["/images/post/linux/vscode.png","4cf8163231b3355acb222eda0f58c3a3"],["/images/post/linux/wangyi-download.png","9508ba916c373ee56ed7ab7a434626e7"],["/images/post/linux/wire-download.png","d15b7fa93a2e1394ec6cb87a7a3d0063"],["/images/post/linux/wire-software.png","d85c5e10fac6273b406aa94f64b32357"],["/images/post/personal/qrcode-weixin.jpg","0a9a7c776879f330f1f6004a9d509c55"],["/images/post/spring/spring-eureka-2.png","4588a5f9fe9e1d450a27a7db30b99f64"],["/images/post/spring/spring-eureka-3.png","d00def2337c69a92bfbf6f1bbe96edf5"],["/images/post/spring/spring-eureka-4.png","c51ee52853264c5eabb735166994c694"],["/images/post/spring/spring-eureka.png","867bc41b3f6ebdb9a926e13aa6efd7a6"],["/images/post/spring/spring-filter.png","54b9676f6def6bf4034dee8a84b2bc01"],["/images/post/spring/spring-ioc-bean-load-flow.jpg","7776f7fe0c2e1af428446710f0b79e23"],["/images/post/spring/spring-structure.png","12debc957a1c2f5efa766ecdd9d0c225"],["/images/post/tablet/bios-boot.png","471839668805bdf7897eb141be2659b1"],["/images/post/tablet/bios-security.png","0206e29b3eb34dd3d0239fc58b37b251"],["/images/post/tablet/ubuntu-install.png","1988a5f9bf2fbd285c929fe22f7cfb0b"],["/images/post/tablet/ubuntu-preview-2.png","7a375fa748038a7932ab0b1f007fa0b0"],["/images/post/tablet/ubuntu-preview.png","21fda04b860e5102f1909e567f5516d3"],["/images/post/tutorial/Thumbs.db","a766fd10d8a02ee8cf29a4e48953445b"],["/images/post/tutorial/blog-browse-effect.jpg","c7b535661daefc2a45f6b4f6a8baad1b"],["/images/post/tutorial/blog-start-cmd.jpg","73dd4983e6dcb0a613938326722daba6"],["/images/post/tutorial/cmd-open-infolder.jpg","1f42e803f9c6dce4001f22330d957fcc"],["/images/post/tutorial/deepin-proxy-setting.png","62676981e1663878863d8d8659b8a840"],["/images/post/tutorial/devkit-download-page.jpg","8075685f3083cc8b1d80d3c74b9154d4"],["/images/post/tutorial/devkit-unzip-process.jpg","509fb9b86042c87809120de71a521c64"],["/images/post/tutorial/git-input-cmd.jpg","009b0867a4460b98b2319e1f19d3df26"],["/images/post/tutorial/git-install-process.jpg","815bbe0f48b0485c7b208a3e6bd71d3d"],["/images/post/tutorial/github-add-webhooks.jpg","918a0199ba57ad32e1e77fe499cdbf4a"],["/images/post/tutorial/github-coding-flow.jpg","6669077e89dffd30d4ad31bb99985fbd"],["/images/post/tutorial/github-create-acnt.jpg","b8b0b4abe240be3b136be6643e8de394"],["/images/post/tutorial/github-create-repo.jpg","f112669ee1adb4fd01e01346f239cfc8"],["/images/post/tutorial/github-submit-repo.jpg","b5dca2a83b616c72cc1e1590f1228ef0"],["/images/post/tutorial/google.com.png","5bdf04b135b8c1dd93221fe9f0f58a34"],["/images/post/tutorial/hook-deploy.png","6b06763a4c106f2c551c777e78182486"],["/images/post/tutorial/hx-account-info.png","c6b0c4c52186cb729951be38f98f1c2a"],["/images/post/tutorial/hx-add-shopping-car.png","551daadcfe9a9b2e9435350ce9c1e39c"],["/images/post/tutorial/hx-checkout.png","f53c84a96307f10fdbfd7e077b6da72f"],["/images/post/tutorial/hx-home-page.png","8266d6f570f3441a66f77b3c1422c238"],["/images/post/tutorial/hx-pay-off.png","362ffba6eb2f143c2290548d6b1b25cf"],["/images/post/tutorial/hx-qr-code.png","33baec5398eef2af2c8f0904dcddf6f4"],["/images/post/tutorial/hx-register.png","27ddc07dd8b021efb35e539f9df81435"],["/images/post/tutorial/hx-subscribe-page.png","9afe911c0c02b85ad1bdfe1b7fb0a9c5"],["/images/post/tutorial/jekyll-download-theme.jpg","31762b46da9ba4b8f120639a16ee0637"],["/images/post/tutorial/jekyll-install-cmd.jpg","5e694ba6858e946d50a19e14e3a358d1"],["/images/post/tutorial/jekyll-install-rst.jpg","949bddd0a77950225ac271a7b79765ea"],["/images/post/tutorial/jenkins-1.png","f92a0f8587a948993a7556d95e24573e"],["/images/post/tutorial/jenkins-10.png","09e15b7e911f53dd6b9e70bbada5f93f"],["/images/post/tutorial/jenkins-11.png","ff1d8dd8a4d66fce12b429096308aa26"],["/images/post/tutorial/jenkins-12.png","e32edcb2ae4a9e8fce5fcd5c2b8ca362"],["/images/post/tutorial/jenkins-2.png","121d8ff64c9efeb736d259204ae6e6e5"],["/images/post/tutorial/jenkins-3.png","a8058bdaef567c28e7698f82f24b2d15"],["/images/post/tutorial/jenkins-4.png","86333ddabf8e9b7b4b4b8c679dd8d04f"],["/images/post/tutorial/jenkins-5.png","e2d2b4d82120467d01c62d0528c0dd8a"],["/images/post/tutorial/jenkins-6.png","d49fe067a5e49ed1597f5bc4295212d9"],["/images/post/tutorial/jenkins-7.png","b1b675232d906600f4f5e1009e23b2db"],["/images/post/tutorial/jenkins-8.png","53b08f4082e5a9667062fb540312986c"],["/images/post/tutorial/jenkins-9.png","32fe4272634a4cab6be3272436ad3151"],["/images/post/tutorial/jenkins-process.png","58222cc2645c52c876558772b250c885"],["/images/post/tutorial/open-openshift-web-console.jpg","ebd73a3b331aa70ecc08919193bac510"],["/images/post/tutorial/openshift-add-phpapp.jpg","9266629731796f84d1b2f1718df98329"],["/images/post/tutorial/pkg-install-info.jpg","4785cdffc11177b7b64e9fccc57a0617"],["/images/post/tutorial/rch-login-successfully.jpg","1c0b13d26ecc1121e11799b3bbb3ac18"],["/images/post/tutorial/ruby-download-page.jpg","2b6b3ef35123a475c6c31553947c6126"],["/images/post/tutorial/ruby-install-step.jpg","4f53df6c963a7e1f4a9fb57e63f02cc4"],["/images/post/tutorial/ss-config.png","c04864ec27db47682e78436017425340"],["/images/post/tutorial/ssqt5-client-gui.png","65c3de6ff57ac28c4a4b3b03e06026e6"],["/images/post/tutorial/terminal-http-proxy.png","8d03b244a505dfbcdd349b0ecb36718a"],["/images/post/tutorial/vim-privoxy-config.png","edf2fcfc35445d89b7e086ca28e8b814"],["/images/post/vmware/Thumbs.db","17f5075e4560dfbd32f9d49f5fddc4c6"],["/images/post/vmware/centos-ping-network.png","fef422fe8e891b7a8470fafb3bfe3d84"],["/images/post/vmware/centos-set-ip.png","b8ad8091216ebf74ae3ff1ecc6143936"],["/images/post/vmware/host-fixed-ip.png","4cdc106445c8dfcc1220b28cad9151fe"],["/images/post/vmware/host-ping-centos.png","3bc7f6cf959a703b461df8b073dfe6c8"],["/images/post/vmware/host-share-wlan.png","96d24b5d889d1e6b62181dd548138712"],["/images/post/vmware/vmware-config-network.png","8290ae2af9232845d85a98af1e810882"],["/images/post/windows/Instant Markdown.html","40228349d3a6354759c7cd3ba84e7d39"],["/images/post/windows/Instant Markdown_files/centos-ping-network.png","d060304e6b1e6acb7be5bb650680d691"],["/images/post/windows/Instant Markdown_files/centos-set-ip.png","cef7df94f87fa018eb3173bac3281750"],["/images/post/windows/Instant Markdown_files/github-highlight.css","44166901febe7ce54b1d838739ddaebe"],["/images/post/windows/Instant Markdown_files/github-markdown.css","5f53433ed39e9fd1b95b0abefc79a855"],["/images/post/windows/Instant Markdown_files/host-fixed-ip.png","96c0d8f80207bc98d14a0cc50f8859f4"],["/images/post/windows/Instant Markdown_files/host-share-wlan.png","3b291dca381bfe24a657eb0059ed6ce9"],["/images/post/windows/Instant Markdown_files/socket.io.js","c0a44522e7a7c2f306b12d0e649053bc"],["/images/post/windows/Instant Markdown_files/vmware-config-network.png","21215f476ffed3a04bc739295330c511"],["/images/post/windows/Thumbs.db","ad11731bd0aa7f691fd9940894ebf470"],["/images/post/windows/bootice-bcd-config.png","e5ee3354a21582f2ab545ab98cd92e57"],["/images/post/windows/bootice-config.png","cea4bf212c489f8f1dd803a883d4c7c7"],["/images/post/windows/rufus.png","2dc6377ae01d7afebc3bead26ba5eca2"],["/images/post/windows/vs-copy-folder.jpg","f4686f7667afe59ae7f6b7f287abc85b"],["/images/post/windows/vs-include-files.jpg","8d4ad7cc4f02a17886fd50092f604776"],["/index.html","2a3fc743cc8a8aca1b9efd1c831d9e42"],["/page10/index.html","d25f63fbc6143f59fe85c41bba4fecab"],["/page11/index.html","1b33c5c75d5dafc3bf2780a51cb69ea4"],["/page12/index.html","b409b20df8a61ce9dc1f83774391237b"],["/page13/index.html","ca486fd87c251819cebfa074c071e320"],["/page2/index.html","e8acb6bb92a95e4d4c016bb7a3399878"],["/page3/index.html","82bb9c8154828129bf64faf14f3d3457"],["/page4/index.html","7c07116b7f3a42b08c3d1d0444c1475b"],["/page5/index.html","9961fdff5b725c0251ab70743f599188"],["/page6/index.html","c3192672ea3e9de448b2dc5302e5e5db"],["/page7/index.html","685a122fd1203023fde5c690fca900c9"],["/page8/index.html","51971c3a710554ef3740a1241e66931b"],["/page9/index.html","73cdc940657e8bc941178929a56f3cfa"],["/tags/index.html","6440348a11fec02356a54bed87428181"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
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

var createCacheKey = function (originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function (originalUrl,
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







