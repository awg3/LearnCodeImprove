angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketio){
    var vm = this;
    
    Story.all().success(function(data){
        vm.stories = data;
    });
    
    vm.createStory = function(){
        Story.create(vm.storyData).success(function(data){
            vm.processing = false;
            // 200 success
            vm.storyData = {};
            //clear out the form
            vm.message = data.message;
        });
        
        vm.stories.push(data);
    };
    
    socketio.on('story', function(data){
        vm.stories.push(data);
    });
})

.controller('AllStoriesController', function(data){
    var vm = this;
    
    vm.stories = stories.data;
    
    socketio.on('story', function(data){
        vm.stories.push(data);
    });
});