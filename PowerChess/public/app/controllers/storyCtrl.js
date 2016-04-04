angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketio){
    var vm = this;
    
    Story.allStory().success(function(data){
        vm.stories = data;
    });
    
    vm.createStory = function(){
        Story.create(vm.storyData).success(function(data){
            // 200 success, clear out the form
            vm.storyData = '';
            
            vm.message = data.message;
        });
        
        vm.stories.push(data);
    }
    
    socketio.on('story', function(data){
        vm.stories.push(data);
    });
});