<?php


namespace FoF\Upload\Adapters;

use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Upload\Contracts\UploadAdapter;
use FoF\Upload\File;
use Illuminate\Container\Container;

class Aliyun extends Flysystem implements UploadAdapter
{
    protected function generateUrl(File $file)
    {
        /** @var SettingsRepositoryInterface $settings */
        $settings = Container::getInstance()->make(SettingsRepositoryInterface::class);
        $path = $file->getAttribute('path');
        if (!$path)
            throw new ValidationException(['upload' => 'Aliyun upload failed.']);

        // cdn url
        $cdnUrl = $settings->get('fof-upload.aliyunCdn');
        if (!$cdnUrl) {
            $endPoint = $settings->get('fof-upload.aliyunEndPoint');
            $bucket = $settings->get('fof-upload.aliyunBucket');
            $cdnUrl = 'https://' . $bucket . '.' . $endPoint;
        }

        $file->url = sprintf('%s/%s', $cdnUrl, $path);
        /** @todo save to local */
    }
}
