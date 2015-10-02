/*
 *
 *
 	GENERAL VARIABLES
 *
 *
 */
var doc = document;



/*
 *
 *
 	GENERAL FUNCTIONS
 *
 *
 */

// Query function
function query(selector, node) {
	if (typeof node === 'undefined') {
		node = document;
	}

	return [].slice.call(node.querySelectorAll(selector));
}




/**
*  Module app
*
* Description
*/
var app = angular.module('app', ['ngMaterial', '720kb.socialshare']);



app.controller('bike', ['$scope', function($scope, $element){
	$scope.wheel = doc.querySelector('#wheel');
	$scope.case = doc.querySelector('#case');
	$scope.shareArea = doc.querySelector('.shareArea');

	$scope.socials = query('.share_el', doc.querySelector('.shareArea'));

	$scope.socialTween = new TimelineMax({paused: true});

	$scope.socialTween
	.staggerFromTo($scope.socials, 0.3, {
		y: 0,
		opacity: 0
	},{
		cycle : {
			y: function (i) {
				return (i + 1) * 100 + "%";
			}
		},
		opacity: 1,
		ease: Back.easeOut
	}, 0.1,"", function () {
		classie.add($scope.shareArea, "active");
	});

	$scope.tl = new TimelineMax();

	$scope.tl.to($scope.wheel, 0.5, {
		y: 8,
		ease: Power2.easeOut
	})
	.to($scope.case, 0.5, {
		y: -8,
		ease: Power2.easeOut
	}, "-=0.5")
	.to($scope.wheel, 0.3, {
		y: 0,
		ease: Power2.easeIn
	})
	.to($scope.case, 0.3, {
		y: 0,
		ease: Power2.easeIn
	}, "-=0.3").repeat(-1).pause();

	$scope.play = function () {
		$scope.tl.play();
	};

	$scope.stop = function () {
		$scope.tl.stop();
	}

	$scope.social = function () {
		if (classie.has($scope.shareArea, "active")) {
			classie.remove( $scope.shareArea, "active" );
			$scope.socialTween.reverse();
		} else {
			$scope.socialTween.play();
		}
	}


	$scope.contactTween = new TimelineMax({paused: true});
	$scope.profile = doc.getElementById('profile');
	$scope.contact = doc.getElementById('contact');

	$scope.contact.style.height = $scope.profile.clientHeight + "px";

	$scope.contactFn = function () {
		TweenMax.to($scope.profile, 0.8, {
			rotationY: 90,
			scale: 0.6,
			ease: Power4.easeIn,
			onComplete: function () {
				TweenMax.set($scope.contact,{opacity:1});
				TweenMax.set($scope.profile,{opacity:0});
			}
		});
		TweenMax.fromTo($scope.contact, 0.4, {
			rotationY: -90,
			scale: 0.6,
			y: "-50%"
		},{
			rotationY: 0,
			scale: 1,
			y: "-50%",
			ease: Power4.easeOut,
			delay: 0.8
		});
	}
}]);



app.controller('info', ['$scope', '$timeout', function($scope, $timeout){
	$scope.information = [
		{icon: "perm_phone_msg", info: "+30 6972 007 452"},
		{icon: "email", info: "izeriti@gmail.com"}
	];
	$scope.info = doc.getElementById('info');
	$scope.extraBtn = $scope.info.querySelector('.extra');
	$scope.extraArea = $scope.info.querySelector('.extraArea');
	$scope.extraWrapper = $scope.extraArea.querySelector(".extraArea_wrapper");
	$scope.extraLayer = $scope.extraWrapper.querySelector('svg circle');


	$scope.tlExtra = new TimelineMax({paused: true,delay: 0.6});

	$timeout(function () {
		$scope.extraHeight = $scope.extraWrapper.clientHeight;
		$scope.extraWidth = $scope.extraWrapper.clientWidth;
		$scope.ratio = Math.sqrt(Math.pow( ($scope.extraWidth/2), 2) + Math.pow( ($scope.extraHeight/2 + 48), 2));
		$scope.animaElem = query('.anima_elem', $scope.extraArea);

		TweenMax.fromTo(doc.getElementById('profile'), 1.2, {
			opacity:1,
			scale:0,
			z:200,
			yPercent:-50,
			rotationX:90
		},{
			opacity:1,
			scale:1,
			z:0,
			yPercent:-0,
			rotationX:0,
			delay:1
		});

		$scope.tlExtra
		.to($scope.extraArea, 0.5, {
			height: $scope.extraHeight + 96,
			ease: Power2.easeIn
		})
		.to($scope.extraBtn, 0.5, {
			x: - $scope.extraWidth/2 -6 + 56,
			ease: Power1.easeOut
		})
		.to($scope.extraBtn, 0.5, {
			y: $scope.extraHeight/2 + 48 - 28,
			ease: Power4.easeOut
		}, "-=0.5")
		.to($scope.extraBtn, 0.3, {
			scale: 0,
			opacity: 0
		})
		.to($scope.extraLayer, 0.6, {
			attr: {
				r: $scope.ratio
			},
			opacity: 1,
			ease: Power2.easeOut,
			onComplete: function () {
				classie.add($scope.extraWrapper, "opened");
			}
		}, "-=0.15")
		.staggerFromTo($scope.animaElem, 0.15, {
			y: 20,
			opacity: 0
		},{
			y: 0,
			opacity: 1,
			ease: Back.easeOut,
			onReverseComplete: function () {
				classie.remove($scope.extraWrapper, "opened");
			}
		}, 0.05, "+=0.3");
	});





	$scope.showExtra = function () {
		$scope.tlExtra.play();
	}
	$scope.hideExtra = function () {
		$scope.tlExtra.reverse();
	}
}]);


app.controller('contactformCtrl', ['$scope', '$timeout', function($, $timeout){
	$.profile = doc.getElementById('profile');
	$.contact = doc.getElementById('contact');
	$.button = $.contact.querySelector('.contactform_btn');
	$.contactTop = $.contact.querySelector('.contact_top');
	$.contactBody = $.contact.querySelector('.contact_body');

	$.bg1 = $.contact.querySelector(".svgBg__bg1");
	$.bg2 = $.contact.querySelector(".svgBg__bg2");
	$.bg3 = $.contact.querySelector(".svgBg__bg3");
	$.plane;
	$.trees = query(".svgBg__tree", $.contact);
	$.leftTrees = query(".svgBg__tree.m--left", $.contact);
	$.rightTrees = query(".svgBg__tree.m--right", $.contact);

	$.rightTreesLeaaf_1 = $.contact.querySelector(".svgBg__tree.m--right.svgBg__tree-3 .svgBg__tree-leafs");
	$.rightTreesLeaaf_2 = $.contact.querySelector(".svgBg__tree.m--right.svgBg__tree-4 .svgBg__tree-leafs");
	$.rightTreesLeaaf_3 = $.contact.querySelector(".svgBg__tree.m--right.svgBg__tree-5 .svgBg__tree-leafs");

	$.rightTreesTrunk_1 = $.contact.querySelector(".svgBg__tree.m--right.svgBg__tree-3 .svgBg__tree-trunk");
	$.rightTreesTrunk_2 = $.contact.querySelector(".svgBg__tree.m--right.svgBg__tree-4 .svgBg__tree-trunk");
	$.rightTreesTrunk_3 = $.contact.querySelector(".svgBg__tree.m--right.svgBg__tree-5 .svgBg__tree-trunk");

	$.leftTreesLeaaf_1 = $.contact.querySelector(".svgBg__tree.m--left.svgBg__tree-1 .svgBg__tree-leafs");
	$.leftTreesLeaaf_2 = $.contact.querySelector(".svgBg__tree.m--left.svgBg__tree-2 .svgBg__tree-leafs");

	$.leftTreesTrunk_1 = $.contact.querySelector(".svgBg__tree.m--left.svgBg__tree-1 .svgBg__tree-trunk");
	$.leftTreesTrunk_2 = $.contact.querySelector(".svgBg__tree.m--left.svgBg__tree-2 .svgBg__tree-trunk");

	$.inputW = $.contact.clientWidth + "px";


	$.planeFly = new TimelineMax({paused: true});
	$.animValue = {value:0};
	$.animItems;

	$timeout(function() {
		$.plane = $.contact.querySelector('.plane');
		$.animItems = function () {
			var point = $.animValue.value;

			TweenMax.set([$.bg3,$.rightTrees], {
				y: 3*point/4
			});
			TweenMax.set([$.bg2,$.leftTrees], {
				y: point/2
			});
			TweenMax.set($.bg1, {
				y: point/3
			});
			TweenMax.set($.plane, {
				rotation: -point/2
			});
			TweenMax.set($.rightTreesLeaaf_1, {
				attr: {
					d: "M264,129 C287,129 272,97 "+(264 + point/6)+",64 C256,97 241,129 264,129"
				}
			});
			TweenMax.set($.rightTreesLeaaf_2, {
				attr: {
					d: "M287,128 C310,128 295,96 "+(287 + point/6)+",63 C279,96 264,128 287,128"
				}
			});
			TweenMax.set($.rightTreesLeaaf_3, {
				attr: {
					d: "M313,128 C336,128 321,96 " + (313 + point/6) + ",63 C305,96 290,128 313,128"
				}
			});

			TweenMax.set($.rightTreesTrunk_1, {
				attr: {
					d: "M266,149 Q265,117 "+(264 + point/10)+",85 Q263,117 262,148"
				}
			});
			TweenMax.set($.rightTreesTrunk_2, {
				attr: {
					d: "M289,148 Q288,116 "+(287 + point/10)+",84 Q286,116 285,147"
				}
			});
			TweenMax.set($.rightTreesTrunk_3, {
				attr: {
					d: "M315,148 Q314,116 " + (313 + point/10) + ",84 Q312,116 311,147"
				}
			});

			TweenMax.set($.leftTreesLeaaf_1, {
				attr: {
					d: "M54,127 C77,127 62,95 "+(54 - point/6)+",63 C46,95 31,127 54,127"
				}
			});
			TweenMax.set($.leftTreesLeaaf_2, {
				attr: {
					d: "M67,124 C90,124 75,92 "+(67 - point/6)+",59 C59,92 44,124 67,124"
				}
			});

			TweenMax.set($.leftTreesTrunk_1, {
				attr: {
					d: "M56,147 Q55,115 "+(54 - point/10)+",83 Q53,115 52,146"
				}
			});
			TweenMax.set($.leftTreesTrunk_2, {
				attr: {
					d: "M69,144 Q68,112 "+(67 - point/10)+",80 Q66,112 65,143"
				}
			});
		}

		$.planeFly
		.fromTo($.plane, 0.58, {
			x:"0vw",
			y:"0vw",
			rotation: 0,
			scale:1
		},{
			x: "550vw",
			y:"-130vw",
			rotation:20,
			scale:0.7,
		})
		.to($.plane, 0.07, {
			x: "450vw",
			y:"-80vw",
			rotation:-160,
			scale:0.5
		})
		.to($.plane, 0.5, {
			x: "-150vw",
			y:"-40vw",
			rotation:-180,
			scale:0.7
		})
		.to($.plane, 0.05, {
			x: "-150vw",
			y:"0vw",
			rotation:0,
			scale:0.7
		})
		.to($.plane, 0.1, {
			x: "0vw",
			y:"0vw",
			rotation:0,
			scale:1,
			onComplete: function() {
				$.planeFly.progress(0).pause();
			}
		});
	}, 10);


	Draggable.create($.contactBody, {
		type: "y",
		edgeResistance:0.65,
		onDrag: function () {
			if (this.y < -50) {
				TweenMax.to($.contactBody, 0.8, {
					y: 0,
					ease: Power3.easeOut
				});
			} else {
//				$.animItems(this.y);
				TweenMax.set($.animValue, {
					value: this.y,
					onUpdate: $.animItems
				});
			}
		},
		onDragEnd: function () {
			TweenMax.to($.contactBody, 1.2, {
				y: 0,
				ease: Elastic.easeOut,
				onUpdate: $.animItems
			});
			TweenMax.to($.animValue, 1.2, {
				value: 0,
				ease: Elastic.easeOut,
				onUpdate: $.animItems
			});

			if ($.animValue.value > 100)
				$.planeFly.timeScale(0.3).play();
		}
	});

	$.backToProfile = function() {
		TweenMax.to($.contact, 0.8, {
			rotationY: 90,
			scale: 0.6,
			ease: Power4.easeIn,
			onComplete: function () {
				TweenMax.set($.contact,{opacity:0});
				TweenMax.set($.profile,{opacity:1});
			}
		});
		TweenMax.fromTo($.profile, 0.4, {
			rotationY: -90,
			scale: 0.6,
			y: "-50%"
		},{
			rotationY: 0,
			scale: 1,
			y: "-50%",
			ease: Power4.easeOut,
			delay:0.8
		});
	};

}]);












