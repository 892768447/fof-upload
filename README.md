# [fof/upload](https://github.com/FriendsOfFlarum/upload) other storage services adapter

## Todo
- [x] github storage
- [x] tencent storage
- [x] aliyun storage
- [ ] upyun storage

## Installation

for flarum beta-15

```sh
composer require fof/upload

# github
composer require radiergummi/flysystem-github-storage -W

# qcloud
composer require freyo/flysystem-qcloud-cos-v5 -W

# aliyun
composer require apollopy/flysystem-aliyun-oss -W
```

```
wget https://github.com/892768447/fof-upload/raw/main/beta-15.zip
```

```
cd your website path

unzip -o beta-15.zip -d vendor/fof/upload

php flarum cache:clear
```

## Links
- [892768447/fof-upload](https://github.com/892768447/fof-upload)
- [FriendsOfFlarum](https://github.com/FriendsOfFlarum)
