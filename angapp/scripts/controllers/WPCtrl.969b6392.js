app.controller("WPCtrl",["$location","$http","$scope","$routeParams","API_URL","Restangular","$sce","wpService","$timeout","$rootScope",function($location,$http,$scope,$routeParams,API_URL,Restangular,$sce,wpService,$timeout,$rootScope){function updatePost(){var req={method:"GET",url:API_URL.wp_api+"posts/?slug="+paras[3]+"&_embed",headers:{},transformRequest:function(data,headersGetter){var headers=headersGetter();return delete headers["X-Auth-Token"],headers},withCredentials:!1};$http(req).success(function(data,status,headers,config){$scope.post=data[0],$rootScope.ogMeta.title=$scope.post.title.rendered;var metaDescription=$scope.post.content.rendered.substring(0,300);metaDescription=metaDescription.replace(/<\/?[^>]+(>|$)/g,""),$rootScope.ogMeta.description=metaDescription+"...",$scope.post.title=$sce.trustAsHtml($scope.post.title.rendered),$rootScope.page_title=$scope.post.title,$scope.post.content=$sce.trustAsHtml($scope.post.content.rendered);var tmp=new Date($scope.post.date);if($scope.post.dateString=tmp.toString(),$scope.post._embedded.author[0].hasOwnProperty("avatar_urls")){var authors=$scope.post._embedded.author[0];for(author in authors.avatar_urls)$scope.post.author_avatar=authors.avatar_urls[author]}else $scope.post.author_avatar="images/placeholder-images/placeholder_profile_photo.png"}).error(function(data,status,headers,config){})}var paras=$location.$$path.split("/");$scope.current_url=$location.absUrl(),$scope.current_url_escaped=escape($location.absUrl()),updatePost(),wpService.categories&&wpService.categories.length?$scope.categories=wpService.categories:wpService.getCategories(function(){$scope.categories=wpService.categories}),$scope.searchIconClick=function(){$location.url("/blog?s="+$scope.s)},$scope.searchEnterPress=function(e){13==e.charCode&&$scope.searchIconClick()},Restangular.one("portal/setting/site_disqus_code").customGET().then(function(success){var disqus_shortname=success[0].value,disqus_identifier=$routeParams.post_id,disqus_url=$location.absUrl();$timeout(function(){if(window.DISQUS)$('<div id="disqus_thread"></div>').insertAfter("#insert-disqus"),DISQUS.reset({reload:!0,config:function(){this.page.identifier=disqus_identifier,this.page.url=disqus_url}});else{$('<div id="disqus_thread"></div>').insertAfter("#insert-disqus"),window.disqus_identifier=disqus_identifier,window.disqus_url=disqus_url;var dsq=document.createElement("script");dsq.type="text/javascript",dsq.async=!0,dsq.src="//"+disqus_shortname+".disqus.com/embed.js",$("head").append(dsq)}})})}]);