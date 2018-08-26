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

var precacheConfig = [["/2016/08/09/repair-windows-UEFI/index.html","5a59903010137905149c9d70eb02d355"],["/2016/08/10/changeLog/index.html","4bf31fe2dcc6adec623bcaa40fc0984d"],["/2016/08/10/cniots-rostering/index.html","79ab94fcfe04e429f791e32b9810812f"],["/2016/08/10/create-blog-with-jekyll/index.html","60f98d76b72bd5e485d00326b38ee5f6"],["/2016/08/10/fixed-ip-in-vmware-linux/index.html","5fed3177b1ac103842b975995da90057"],["/2016/08/11/show-all-files-in-visualStudio/index.html","7a91790674a6219777d09ec66feef69e"],["/2016/08/13/use-cnzz-show-pv/index.html","6b53036f4ef1b3ec24b946bacd6b2b07"],["/2016/08/14/Sublime-snippets/index.html","f28c2ced9faa2b57d56504063fc62945"],["/2016/08/28/github-consistent-with-coding/index.html","05c36135237aca721cfec924fced53a6"],["/2016/08/28/hybird-dispatcher-for-c51/index.html","d03e2264e1990d8beacbdd89db7cf808"],["/2016/08/28/transfer-function-with-json/index.html","e6eecbba9d35dcd8d95ef1897765b12e"],["/2016/09/05/draw-flowchart-in-markdown/index.html","2c311e7962c88b49fd4607d5e0535755"],["/2016/09/05/timetable-2016-2017-01/index.html","a8e4be81e9af8ce019d9b9bd7cc2ebc6"],["/2017/04/08/proxy-on-linux-final/index.html","91edd125ef917a90e8677e51dddc9502"],["/2017/04/09/linux-recommended-software/index.html","12703592a5db5813ab81b64ff02c265f"],["/2017/04/11/install-ubuntu-on-tablet/index.html","283ec938435b9f23505d7b793d8ba96c"],["/2017/05/15/docker-usefull-cmd/index.html","29cf86b61ceaed3e81cbaaf91bfb882b"],["/2017/05/18/spring-cloud-1/index.html","5f72f824adf0f779c99be8b9ab18c30c"],["/2017/05/18/spring-cloud-2/index.html","10fec17b1379455b85d16273d696f10b"],["/2017/05/18/spring-cloud-3/index.html","eee2d926ce4a1b9ab756de28d20d9294"],["/2017/05/18/spring-cloud-4/index.html","69a747ef110aba1ff1f29d0705571e03"],["/2017/05/18/spring-cloud-5/index.html","cfd02ec7d07acabb57075aaf7fa1ec81"],["/2017/08/09/leetcode-1/index.html","4679303c9588b80e81deacb4ca2a615a"],["/2017/08/10/leetcode-2/index.html","f846431dd2915574fcab3154e0c404e9"],["/2017/08/14/leetcode-array-1/index.html","753d7a60a20fd7e13613bff8f1643265"],["/2017/08/15/leetcode-array-2/index.html","e4b92e811ba4cd951bc15f6a62abd6af"],["/2017/10/10/code-art-c1/index.html","94e68b0181050b4c20d42067d881d379"],["/2017/10/11/code-art-c2-1/index.html","9f71911a9a4cddadd119b5a96d1d470e"],["/2017/10/11/code-art-c2-2/index.html","435b205a311fc97d40603ce086914403"],["/2017/10/19/algorithm-dfs/index.html","d65e558749d34f41d9cdbc525c5d4c9f"],["/2018/01/11/java-hashmap/index.html","4dc65eafe18c50c90f24b1ca47b4475a"],["/2018/01/11/java-question/index.html","6f6871c6401a35caf035d1b49f7e1cc0"],["/2018/01/12/crack-interview-array-string/index.html","4b1d49a8388f44157abfe25f76ce6b4d"],["/2018/01/12/java-linkedhashmap/index.html","9c26725b03a01cd7ca1de1640480b679"],["/2018/01/13/java-collection/index.html","451c6ecf14b687b9e91f8eb8996bc75b"],["/2018/01/13/java-string-buffer-builder/index.html","e7ef7815c4fd1280b9b54a1ebe749089"],["/2018/01/14/crack-interview-linkedlist/index.html","7dd4e9a98d09e8c6a9e6c8472d8120df"],["/2018/01/15/deepin-into-java/index.html","4d3b75fecdd9c0aaa637bca18b0abaa7"],["/2018/01/16/csharp-java-diff/index.html","337d8bd851c616972d627494281f3fb4"],["/2018/01/17/java-thread-cas/index.html","881ccf8a326fe47c4404b099e1ddd406"],["/2018/01/18/carck-interview-stack-queue/index.html","9ddbc061e4add6ad47b9650c0dbeecd7"],["/2018/01/22/crack-interview-tree-graph/index.html","0342e6847a77ae0516e0fc112cc14d0f"],["/2018/01/23/chinese-copywriting-guidelines/index.html","1dab038b2ef9937503ba5c2dda5d31a2"],["/2018/01/23/struct-tree/index.html","e978cc80898f0a7efbea6abcc421f9eb"],["/2018/01/31/it-guide-stack/index.html","3bde0ab2233746a68948ce8cff6ca424"],["/2018/02/11/csharp-weak-event-store/index.html","655744b7d1b4e5eb30a2874e309ac827"],["/2018/02/23/it-guide-linked-list/index.html","0719a48b59dcac161a60695a5cbfea4b"],["/2018/02/26/java-integer-equals/index.html","f29f73ed12d8d4b968f8d349dc128678"],["/2018/02/27/ramos-brush/index.html","92a36649ffe2b322337936742098dbb0"],["/2018/02/27/wifi-remote-control/index.html","e521b657c1b5dd7599ae25d1c352c8ad"],["/2018/03/01/c-x86-x64-type-bytes/index.html","77ad108172bc6a0960f47021348fd3ae"],["/2018/03/01/interview-qa/index.html","0e85e3d12e366acac517865e71dabf11"],["/2018/03/05/trave-bin-tree-not-recursive/index.html","79bec1d91596dd11f68092c995bbdf13"],["/2018/03/06/it-guide-tree/index.html","aa57bd6751543b6b1bca6d326cffdc57"],["/2018/03/10/prepare-interview/index.html","04218ff0b4aefe03f73d900695f163ca"],["/2018/03/12/build-tree-by-travel-result/index.html","74df0fbe2980b5a88084c7c6555b6aae"],["/2018/03/13/alibaba-interview-record/index.html","a66e319ed1cb88d4af2a9edb8f5b36e5"],["/2018/03/14/dp-edit-distance/index.html","5a325e710e0d5ef24a04cef94d4650a8"],["/2018/03/14/dp-pyramid/index.html","c2cfa011c9a0cd1531b795f49301f3dd"],["/2018/03/15/dp-matrix-access/index.html","84c5185b81b275dffd4ea324bba973f5"],["/2018/03/15/knapsack-01/index.html","1e777abb2c846f7ed17e69da3cd2ead3"],["/2018/03/15/knapsack-complete/index.html","4fb7dca54fef9f3ff47702c22827690d"],["/2018/03/15/knapsack-multiple/index.html","aa9ef659cd47c2c55daa26460273f7ad"],["/2018/03/16/dp-long-inc-sub-seq/index.html","c4c8a57d50dc5c3f78506d0e6dcf1dba"],["/2018/03/17/algorithm-dp/index.html","c4a8b38f2e984f9ef6d525d5f5e669fe"],["/2018/03/17/dp-sub-seq-sum-max/index.html","0cecee0303aeb2af1d393964f7c29513"],["/2018/03/17/int-array-split/index.html","71409d28aa084078bf42584efda0c740"],["/2018/03/20/deep-into-jvm/index.html","10d0c8262be056c5a65054475eaab176"],["/2018/03/20/dp-count-bits/index.html","d9f7a12cb8e97b89d23ebbfa04d9091c"],["/2018/03/20/dp-money-make-up/index.html","99a30a47be9bec70b60188ed80c0960c"],["/2018/03/22/interview-mistakes/index.html","72fb745b3f757dbe95605ab1e846f6d2"],["/2018/03/24/min-integral/index.html","cfc5d24540bd6bfeddc92421a179190f"],["/2018/03/25/bfs-course-schedule/index.html","f23b1f331359c069036380dc9d6fff5c"],["/2018/03/26/algorithm-bfs/index.html","e98a9be3f2b91e149e5e9c5773d32025"],["/2018/03/26/algorithm-dag/index.html","a33ecb5fa4528762eaf7abd0cdc9fc48"],["/2018/03/27/bfs-min-height-trees/index.html","894f1f238e57ad8a1a42758d192fdf2a"],["/2018/03/28/java-skill/index.html","e2d2c9f330c9c21cff42611bcd22e823"],["/2018/03/29/algorithm-heap-sort/index.html","cb60d6555d9bbc0afe0fa6fb85343d85"],["/2018/03/29/bfs-word-ladder-II/index.html","44fd36428843e43a14d8cb881c818f1d"],["/2018/03/30/algorithm-quick-sort/index.html","e0e31a705ad0f225543c1361a4f200df"],["/2018/04/02/algorithm-bubble-sort/index.html","a41f148eb93ce4f966c9dcffad923bc1"],["/2018/04/02/greedy-arange-room/index.html","1154a3f196466804246e738dd5a8623a"],["/2018/04/03/algorithm-insert-sort/index.html","ea04916c781f9005e53729332d4e7c62"],["/2018/04/04/algorithm-shell-sort/index.html","49e6c57761c1c962a31b4084268f9358"],["/2018/04/05/algorithm-select-sort/index.html","89890103afed176276f28837d05b2843"],["/2018/04/06/algorithm-merge-sort/index.html","6eaa53be49d9a0b35108a4a8bfd62960"],["/2018/04/06/algorithm-summary/index.html","95ac4d4c164167a19d51cc2925533314"],["/2018/04/06/linux-double-network-set/index.html","a1de12da4d96d73aadf6c4a47d48449f"],["/2018/04/07/algorithm-bucket-sort/index.html","9057f381aac68a91b80b8819145cda35"],["/2018/04/08/algorithm-combination/index.html","4d17feae70a14e14239bf3f0d926a0ca"],["/2018/04/12/algorithm-stock/index.html","a04047b2b21bd6d380b910bac831316b"],["/2018/04/14/algorithm-n-queens/index.html","0a349224bdf31dab05b34041fc62fd5d"],["/2018/05/25/algorithm-bin-search/index.html","292ba2ac176428d01ac7a19e2f8ce593"],["/2018/08/04/algorithm-subarray/index.html","ecec738e7519b633cdf1c9800dab0d03"],["/2018/08/21/algorithm-sudoku/index.html","82cd3fcd2602b2e254ac949b04fa63d4"],["/2018/08/22/algorithm-sort-list/index.html","88595a0494757568c3da874fe4ff53d2"],["/2018/08/23/deploy-with-git-hook/index.html","1ddf94223311f002026db35f67298a1c"],["/404.html","60025a1fff99867b75591bd4fe49a5b2"],["/about/index.html","9a446edaf2ff9dcceb084b624b86e73a"],["/archive/index.html","56a70aed462ca8a0af2a9ab178a32409"],["/categories/detail/index.html","6dde5620fe1bddcf848e06d4dda5290f"],["/categories/index.html","534dc16334d271f0b64b3f898e395b5f"],["/files/autoproxy.pac","f38ff491f04c5b38744c68e2f2b01449"],["/files/wsd/deploy-with-git-hook.wsd","7fdae46e552b9f7912563c22ee09fc14"],["/images/post/algorithm/bubble-sort.png","4a1a7cf345a3ad202aa1eb269ef6fc2a"],["/images/post/algorithm/bucket-sort.jpg","fd877427e2a0068c91501e2f8131eebc"],["/images/post/algorithm/dag-false.png","d252539570ac36547c5402ef27c6932c"],["/images/post/algorithm/dag-true.png","b4585b05de2afc4046dc9c1154cb1431"],["/images/post/algorithm/dp-edit-distance.png","fd3372adfe50b160e2f887b5c85cb34d"],["/images/post/algorithm/greddy-arange-room.png","a6c80775dd844643ba1ca6670565e241"],["/images/post/algorithm/heap-bin-tree.png","54d9582a922433eeb32a959a56301fdb"],["/images/post/algorithm/heap-min-top.png","141e8a9ff640eb7988b82b9f047f77bb"],["/images/post/algorithm/heap-shiftdown.png","7ba1f2b1b6e15d640e6d0ce8c928d9bb"],["/images/post/algorithm/heap-shiftup.png","c2ac4639e0a356a258dd4e8f20bd9501"],["/images/post/algorithm/insert-sort.png","70fb0b01a263f2326a2c0479a0f0b974"],["/images/post/algorithm/matrix-histogram.png","0ac021852d4e835a195c304deafa3565"],["/images/post/algorithm/merge-sort.jpg","36d063bbfb121e8a3ffded51f26a8d93"],["/images/post/algorithm/n-queens.jpg","24afdfbb2b65f42118d4602778791950"],["/images/post/algorithm/quick-sort-1.png","3e18e2c96a70de9589613b328d89402c"],["/images/post/algorithm/quick-sort-2.png","908d11e798ae0161cf4dacfe9f0d398b"],["/images/post/algorithm/quick-sort-3.png","b2207fd6a3eb955df514fcc1114dc2b8"],["/images/post/algorithm/quick-sort-4.png","ab51f80b20fce68d8d799deb6c697ce1"],["/images/post/algorithm/shell-sort-1.png","c52e08027910d98f78ee1d225cf03a8b"],["/images/post/algorithm/sudoku-1.png","dd1a08b31f2434bc32bd990cd55a7e51"],["/images/post/algorithm/sudoku-2.png","1200c5aae9f02bd72abbb7e9688306c3"],["/images/post/crack/cnzz-get-code.jpg","138b95e8334f03b9dd6061759b142821"],["/images/post/java/array-heap.png","d2c365b36d90efcbefb59aba3df52b25"],["/images/post/java/classloader.png","dc0c6c8c86602580d9cf3d67acdf9ae3"],["/images/post/java/collection-diff.png","a2caba3a46b3e52daa10ca84a5e148c0"],["/images/post/java/collection-func.png","5acbe61162b82d1e22f4450b7d5c4ecf"],["/images/post/java/collection-impl-func.png","98483a748c317d9d301d61172d7c7e5e"],["/images/post/java/collection-impl.gif","9880d75c8d57964e3e91fb7d216bc7cd"],["/images/post/java/collection-struct.png","45889129a856f03bf4a2b8c5d9bb8681"],["/images/post/java/const-pool.jpg","eedf85322f8aefa5bd2e8bfd8895999d"],["/images/post/java/for-heap.png","da9a71beeb33c8d9dac92c96bc4dd87b"],["/images/post/java/hashmap-code.png","4acf898694b8fb53498542dc0c5f765a"],["/images/post/java/hashmap-refresh.png","da2df9ad67181daa328bb09515c1e1c8"],["/images/post/java/hashmap-resize-16-32.png","10d36fdd4a1165bc6f75491f89cc3743"],["/images/post/java/hashmap-resize.png","8d3f779ad8dfcd685a538bbeb0b24cfe"],["/images/post/java/hashmap-struct.png","f3e5f990f5d68e3b6f4753a2cce7e1e9"],["/images/post/java/iterator-uml-detail.png","9880d75c8d57964e3e91fb7d216bc7cd"],["/images/post/java/iterator-uml.png","45889129a856f03bf4a2b8c5d9bb8681"],["/images/post/java/jmm-struct.png","e2c65859bed7dbc96749915b029ba3f9"],["/images/post/java/jvm-compile-process.png","df7fd40aa773c6d3a62ec1f08cc823b1"],["/images/post/java/jvm-gc-copying.jpg","67dc710ec041a9b83949ea068000a55b"],["/images/post/java/jvm-gc-mark-compact.jpg","dbe4acc646b8383a307fa50c842b9a41"],["/images/post/java/jvm-gc-mark-swap.png","29eee2766457155d4c29cf60c359e42f"],["/images/post/java/jvm-java-version.png","0ed9ac438d9dd63e20757557a1c8a5e4"],["/images/post/java/jvm-javac-process.png","4a9f4c3ca832a127df4841f2a947bf17"],["/images/post/java/jvm-jit-for-process.png","b3183d1671456dbdd7d391ac1ac890b5"],["/images/post/java/jvm-jit-process.png","608713ad19eadbf7abc5fe06387c98d0"],["/images/post/java/jvm-stack-frame.png","8d9cc7e11a001db7d4e73cf6e1f99427"],["/images/post/java/jvm-thread-status.png","20419efbf873ab71a90e3c575d9a5133"],["/images/post/java/linkedhashmap-struct.png","168fb7335dd7b37c92cce97443538460"],["/images/post/java/loop-linked-list-intersect-in-loop.png","29d3d4d19c6e9f4994f4ecc9993dc631"],["/images/post/java/loop-linked-list-intersect.png","6dadd4dda1a5e8289635a2e6c8377acc"],["/images/post/java/main-load-step.png","b234a42cd686a16a9424b406dd1e0931"],["/images/post/java/map-func.png","1a86e430be30d7d9234fabeb4a7c2454"],["/images/post/java/method-area.png","70d55dc91b61e70ef4465a26a3efabe9"],["/images/post/java/native-method-stack.png","1ceecd94e75d9b60d440c42906423c66"],["/images/post/java/noloop-linked-list-intersect.png","6f293d5e33dff93f0f402dfa10cc9677"],["/images/post/java/stack-method.png","b135585945ef708d2944528d9a4b4f41"],["/images/post/java/stack-ref-heap.png","25692e208dac15a12202dbf959ab2432"],["/images/post/java/string-heap-change.png","229a2be706f213d80d035ba58dc0e62a"],["/images/post/java/string-heap.png","40efc39061651b7bdd8982578783da6b"],["/images/post/json/josn-with-function.jpg","6668bd621fed83da922a930f82c423be"],["/images/post/linux/albert.png","53be675bd99ab598bf6f5892bb89bcfa"],["/images/post/linux/cliplt.png","8f537742868d0b87655b11a1f2a4b062"],["/images/post/linux/dbeaver.png","c66477ce429bddad5aeed39dd2ce0900"],["/images/post/linux/filezilla.png","12253f448272c994d079770c37b40b15"],["/images/post/linux/idea-main.png","78f436d4e504b7908b75854587f1438f"],["/images/post/linux/idea-start.png","1c5d9557a69a654190ac846d7a5c0e12"],["/images/post/linux/irssi.png","9b3b921a8f180e826d64bc15345880b8"],["/images/post/linux/kodi.png","f40be28d619f0d335190e7dbe41c121c"],["/images/post/linux/linuxium-page.pong.png","4a72300359cb3dc17819d69ed101075d"],["/images/post/linux/mpv.png","3d203113a4fe9b077810da9e4e6065ae"],["/images/post/linux/nylas.png","75d6ba7d153f71c3a1066e35c7b3817b"],["/images/post/linux/officeonline-new-file.png","b264a32276c381ec57cb12c0910911fa"],["/images/post/linux/officeonline-word.png","d94e7c2ecade6ef6e035b4c17d3d6821"],["/images/post/linux/qipmsg.png","0631433833d6fc7da053a2c7b8cb6988"],["/images/post/linux/redis-desktop-manager.png","5c093c412b29a56b6645a6de0110de14"],["/images/post/linux/redshift.png","016d62c5e8acd3a8880f714232d45422"],["/images/post/linux/typroa.png","5c51a8d2a962d145d22c77ae65ef75c1"],["/images/post/linux/vscode.png","4cf8163231b3355acb222eda0f58c3a3"],["/images/post/linux/wangyi-download.png","9508ba916c373ee56ed7ab7a434626e7"],["/images/post/linux/wire-download.png","d15b7fa93a2e1394ec6cb87a7a3d0063"],["/images/post/linux/wire-software.png","d85c5e10fac6273b406aa94f64b32357"],["/images/post/personal/qrcode-weixin.jpg","0a9a7c776879f330f1f6004a9d509c55"],["/images/post/spring/spring-eureka-2.png","4588a5f9fe9e1d450a27a7db30b99f64"],["/images/post/spring/spring-eureka-3.png","d00def2337c69a92bfbf6f1bbe96edf5"],["/images/post/spring/spring-eureka-4.png","c51ee52853264c5eabb735166994c694"],["/images/post/spring/spring-eureka.png","867bc41b3f6ebdb9a926e13aa6efd7a6"],["/images/post/spring/spring-filter.png","54b9676f6def6bf4034dee8a84b2bc01"],["/images/post/spring/spring-ioc-bean-load-flow.jpg","7776f7fe0c2e1af428446710f0b79e23"],["/images/post/spring/spring-structure.png","12debc957a1c2f5efa766ecdd9d0c225"],["/images/post/tablet/bios-boot.png","471839668805bdf7897eb141be2659b1"],["/images/post/tablet/bios-security.png","0206e29b3eb34dd3d0239fc58b37b251"],["/images/post/tablet/ubuntu-install.png","1988a5f9bf2fbd285c929fe22f7cfb0b"],["/images/post/tablet/ubuntu-preview-2.png","7a375fa748038a7932ab0b1f007fa0b0"],["/images/post/tablet/ubuntu-preview.png","21fda04b860e5102f1909e567f5516d3"],["/images/post/tutorial/Thumbs.db","a766fd10d8a02ee8cf29a4e48953445b"],["/images/post/tutorial/blog-browse-effect.jpg","c7b535661daefc2a45f6b4f6a8baad1b"],["/images/post/tutorial/blog-start-cmd.jpg","73dd4983e6dcb0a613938326722daba6"],["/images/post/tutorial/cmd-open-infolder.jpg","1f42e803f9c6dce4001f22330d957fcc"],["/images/post/tutorial/deepin-proxy-setting.png","62676981e1663878863d8d8659b8a840"],["/images/post/tutorial/devkit-download-page.jpg","8075685f3083cc8b1d80d3c74b9154d4"],["/images/post/tutorial/devkit-unzip-process.jpg","509fb9b86042c87809120de71a521c64"],["/images/post/tutorial/git-input-cmd.jpg","009b0867a4460b98b2319e1f19d3df26"],["/images/post/tutorial/git-install-process.jpg","815bbe0f48b0485c7b208a3e6bd71d3d"],["/images/post/tutorial/github-add-webhooks.jpg","918a0199ba57ad32e1e77fe499cdbf4a"],["/images/post/tutorial/github-coding-flow.jpg","6669077e89dffd30d4ad31bb99985fbd"],["/images/post/tutorial/github-create-acnt.jpg","b8b0b4abe240be3b136be6643e8de394"],["/images/post/tutorial/github-create-repo.jpg","f112669ee1adb4fd01e01346f239cfc8"],["/images/post/tutorial/github-submit-repo.jpg","b5dca2a83b616c72cc1e1590f1228ef0"],["/images/post/tutorial/google.com.png","5bdf04b135b8c1dd93221fe9f0f58a34"],["/images/post/tutorial/hook-deploy.png","6b06763a4c106f2c551c777e78182486"],["/images/post/tutorial/hx-account-info.png","c6b0c4c52186cb729951be38f98f1c2a"],["/images/post/tutorial/hx-add-shopping-car.png","551daadcfe9a9b2e9435350ce9c1e39c"],["/images/post/tutorial/hx-checkout.png","f53c84a96307f10fdbfd7e077b6da72f"],["/images/post/tutorial/hx-home-page.png","8266d6f570f3441a66f77b3c1422c238"],["/images/post/tutorial/hx-pay-off.png","362ffba6eb2f143c2290548d6b1b25cf"],["/images/post/tutorial/hx-qr-code.png","33baec5398eef2af2c8f0904dcddf6f4"],["/images/post/tutorial/hx-register.png","27ddc07dd8b021efb35e539f9df81435"],["/images/post/tutorial/hx-subscribe-page.png","9afe911c0c02b85ad1bdfe1b7fb0a9c5"],["/images/post/tutorial/jekyll-download-theme.jpg","31762b46da9ba4b8f120639a16ee0637"],["/images/post/tutorial/jekyll-install-cmd.jpg","5e694ba6858e946d50a19e14e3a358d1"],["/images/post/tutorial/jekyll-install-rst.jpg","949bddd0a77950225ac271a7b79765ea"],["/images/post/tutorial/open-openshift-web-console.jpg","ebd73a3b331aa70ecc08919193bac510"],["/images/post/tutorial/openshift-add-phpapp.jpg","9266629731796f84d1b2f1718df98329"],["/images/post/tutorial/pkg-install-info.jpg","4785cdffc11177b7b64e9fccc57a0617"],["/images/post/tutorial/rch-login-successfully.jpg","1c0b13d26ecc1121e11799b3bbb3ac18"],["/images/post/tutorial/ruby-download-page.jpg","2b6b3ef35123a475c6c31553947c6126"],["/images/post/tutorial/ruby-install-step.jpg","4f53df6c963a7e1f4a9fb57e63f02cc4"],["/images/post/tutorial/ss-config.png","c04864ec27db47682e78436017425340"],["/images/post/tutorial/ssqt5-client-gui.png","65c3de6ff57ac28c4a4b3b03e06026e6"],["/images/post/tutorial/terminal-http-proxy.png","8d03b244a505dfbcdd349b0ecb36718a"],["/images/post/tutorial/vim-privoxy-config.png","edf2fcfc35445d89b7e086ca28e8b814"],["/images/post/vmware/Thumbs.db","17f5075e4560dfbd32f9d49f5fddc4c6"],["/images/post/vmware/centos-ping-network.png","fef422fe8e891b7a8470fafb3bfe3d84"],["/images/post/vmware/centos-set-ip.png","b8ad8091216ebf74ae3ff1ecc6143936"],["/images/post/vmware/host-fixed-ip.png","4cdc106445c8dfcc1220b28cad9151fe"],["/images/post/vmware/host-ping-centos.png","3bc7f6cf959a703b461df8b073dfe6c8"],["/images/post/vmware/host-share-wlan.png","96d24b5d889d1e6b62181dd548138712"],["/images/post/vmware/vmware-config-network.png","8290ae2af9232845d85a98af1e810882"],["/images/post/windows/Instant Markdown.html","40228349d3a6354759c7cd3ba84e7d39"],["/images/post/windows/Instant Markdown_files/centos-ping-network.png","d060304e6b1e6acb7be5bb650680d691"],["/images/post/windows/Instant Markdown_files/centos-set-ip.png","cef7df94f87fa018eb3173bac3281750"],["/images/post/windows/Instant Markdown_files/github-highlight.css","44166901febe7ce54b1d838739ddaebe"],["/images/post/windows/Instant Markdown_files/github-markdown.css","5f53433ed39e9fd1b95b0abefc79a855"],["/images/post/windows/Instant Markdown_files/host-fixed-ip.png","96c0d8f80207bc98d14a0cc50f8859f4"],["/images/post/windows/Instant Markdown_files/host-share-wlan.png","3b291dca381bfe24a657eb0059ed6ce9"],["/images/post/windows/Instant Markdown_files/socket.io.js","c0a44522e7a7c2f306b12d0e649053bc"],["/images/post/windows/Instant Markdown_files/vmware-config-network.png","21215f476ffed3a04bc739295330c511"],["/images/post/windows/Thumbs.db","ad11731bd0aa7f691fd9940894ebf470"],["/images/post/windows/bootice-bcd-config.png","e5ee3354a21582f2ab545ab98cd92e57"],["/images/post/windows/bootice-config.png","cea4bf212c489f8f1dd803a883d4c7c7"],["/images/post/windows/rufus.png","2dc6377ae01d7afebc3bead26ba5eca2"],["/images/post/windows/vs-copy-folder.jpg","f4686f7667afe59ae7f6b7f287abc85b"],["/images/post/windows/vs-include-files.jpg","8d4ad7cc4f02a17886fd50092f604776"],["/index.html","e9d76bee707db58fe4ae5a2d55d26106"],["/page10/index.html","3b0a18758b11b1c55de7e3f13ce3fee7"],["/page11/index.html","75f6e9267a614cb91d817ed0aaab9205"],["/page12/index.html","2295eb0d5ef747bdfbb17fa49970431d"],["/page13/index.html","b611f3c18026c50705c1b266f9de94a7"],["/page2/index.html","0d0fc4b0984209ff8100e4955ff4d64b"],["/page3/index.html","f9e2fc989a1a0aa2a807b9f3330de62c"],["/page4/index.html","ff61fe4e6f1c7abd5366ef4b99eda286"],["/page5/index.html","c0a9e6c02eb4c3154d620fb95467f5f2"],["/page6/index.html","32f491e9d498b764010ee6b381a32ee5"],["/page7/index.html","f5beb05b185fb3775aae79e6dd78a6a1"],["/page8/index.html","2bb82c897c7db1222dc92508212c2139"],["/page9/index.html","b68a02c9f9b99290c6f481299b66fd3e"],["/tags/index.html","6077ef008f91da34a3b3861efb9d72ca"]];
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







