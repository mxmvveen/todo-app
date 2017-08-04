(function() {
	angular
		.module('todoApp')
		.controller('todoAppController', todoAppController);

	function todoAppController($scope) {
		var storedList = false;
		$scope.submitValue = 'Add this item';
		if (localStorage.length > 0) {
			var unparsedList = localStorage.getItem('storedList');
			storedList = JSON.parse(unparsedList);
		}
		if (storedList) {
			for (var i = 0; i < storedList.length; i++) {
				delete storedList[i]['$$hashKey'];
			}
			$scope.todoList = storedList;
		} else {
			$scope.todoList = [];
		}
		var theList = $scope.todoList;
		var change = false;
		var listIndex = 0;
		$scope.newTodo = function(todo) {
			if ($scope.todoList.todoItem !== '' && $scope.todoList.todoItem !== undefined) {
				if (!change) {
					theList.push({
						item: $scope.todoList.todoItem,
						priority: $scope.todoList.priority
					});
				} else {
					var thisTodo = $scope.todoList.indexOf(todo);
					$scope.todoList[listIndex] = {
						item: $scope.todoList.todoItem,
						priority: $scope.todoList.priority
					}
					$scope.submitValue = 'Add this item';
					change = false;
				}
				$scope.todoList.todoItem = '';
				$scope.todoList.priority = 'c-prio';
			} else {
				alert('Please add a todo before you submit');
			}
			localStorage.setItem('storedList', JSON.stringify(theList));
		};
		$scope.remove = function(todo) {
			var thisTodo = $scope.todoList.indexOf(todo);
			$scope.todoList.splice(thisTodo, 1);
			localStorage.setItem('storedList', JSON.stringify(theList));
		}
		$scope.change = function(todo) {
			change = true;
			var thisTodo = $scope.todoList.indexOf(todo);
			$scope.todoList.todoItem = $scope.todoList[thisTodo].item;
			$scope.todoList.priority = $scope.todoList[thisTodo].priority;
			$scope.submitValue = 'Change this item';
			listIndex = thisTodo;
			localStorage.setItem('storedList', JSON.stringify(theList));
		}
	}

})();