<template>
	<view class="center">
		<m-count-down :fontSize="50" :separator="['colon', 'zh'][0]" :showBorder="true"
					  :showDays="true" bg-color="rgb(250, 250, 250)" border-color="#303133"
					  :timestamp="['60', '86400', '983272', '5'][3]"
					  class="" color="#303133" ref="uCountDown"
					  separator-color="#303133"></m-count-down>
	</view>
</template>
