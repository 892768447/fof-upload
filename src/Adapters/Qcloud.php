<?php


namespace FoF\Upload\Adapters;

use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Upload\Contracts\UploadAdapter;
use FoF\Upload\File;
use Illuminate\Container\Container;

class Qcloud extends Flysystem implements UploadAdapter
{
    protected function generateUrl(File $file)
    {
        /** @var SettingsRepositoryInterface $settings */
        $settings = Container::getInstance()->make(SettingsRepositoryInterface::class);
        $path = $file->getAttribute('path');
        if (!$path)
            throw new ValidationException(['upload' => 'Qcloud upload failed.']);

        // cdn url
        $cdnUrl = $settings->get('fof-upload.qcloudCdn');
        if (!$cdnUrl) {
            $region = $settings->get('fof-upload.qcloudRegion');
            $bucket = $settings->get('fof-upload.qcloudBucket');
            $cdnUrl = 'https://' . $bucket . '.cos.' . $region . '.myqcloud.com';
        }

        $file->url = sprintf('%s/%s', $cdnUrl, $path);
        /** @todo save to local */
    }
}
